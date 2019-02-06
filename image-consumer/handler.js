'use strict';

const elasticSearchService = require('./service/elasticsearchService')
const dynamodbService = require('./service/dynamodbService')

module.exports.consumer = async (event) => {
  for (const record of event.Records) {
    const item = JSON.parse(record.body)
    const dbItem = await dynamodbService.getItem(item.key)
    switch (item.eventType) {
      case 'TAG_EVENT':
        await elasticSearchService.index({
          id: item.key,
          tags: item.labels
        });
        dbItem.labels = item.labels
        break;
      case 'FILTER_EVENT':
        dbItem.blackWhiteFilter = {
          bucket: item.bucket,
          key: item.key
        }
        break;
      case 'THUMBNAIL_EVENT':
        dbItem.thumbnail = {
          bucket: item.bucket,
          key: item.key
        }
        break;
    }
    await dynamodbService.putItem(dbItem)
  }
  return { message: 'Mensagens consumidas com sucesso!', event };
};
