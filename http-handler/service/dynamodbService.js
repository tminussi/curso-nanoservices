const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE = 'imagens';

const put = item => {
    return new Promise((res, rej) => {
        dynamodb.put({
            TableName: TABLE,
            Item: {
                id: item.key,
                bucket: item.bucket
            }
        }, (err, data) => {
            if (err) {
                return rej(err);
            }
            return res(data);
        })
    });
}

module.exports = {
    put: put
}