const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    apiVersion: '6.4',
    host: 'https://vpc-elasticsearch-cluster-4elv24hr6iilj2ms4kfkqkbyu4.us-east-1.es.amazonaws.com',
});

const search = async query => {
    return await client.search({
        index: 'imagens',
        q: 'tags:' + query
    })
}

module.exports = {
    search: search
}