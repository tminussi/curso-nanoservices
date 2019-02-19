const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const uuid = require('uuid/v4');

const s3 = new AWS.S3();

const BUCKET = 'nanoservices-imagens'


const upload = body => {

    const base64String = body.replace(/^data:image\/\w+;base64,/, "");
    const buffer = new Buffer(base64String, 'base64');
    const id = uuid();
    return new Promise((res, rej) => {
        s3.putObject({
            Bucket: BUCKET,
            Key: id + '.jpg',
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        }, (err) => {
            if (err) {
                return rej(err);
            }
            return res({
                bucket: BUCKET,
                key: id + '.jpg'
            });
        });
    });

}

module.exports = {
    upload: upload
}

