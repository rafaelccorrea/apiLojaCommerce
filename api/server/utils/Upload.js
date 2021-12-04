import AWS from 'aws-sdk';
import { Paths } from '../constants';

const bucketName = 's3ganhepontos';

export default (buffer, entity, identify) =>
  new Promise((resolve, reject) => {
    AWS.config.update({
      accessKeyId: 'AKIAQPEA5DLO7BJD3MZX',
      secretAccessKey: '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',
    });

    const s3 = new AWS.S3();
    const path = `${Paths(entity)}${identify}`;

    const params = {
      Bucket: bucketName,
      Body: buffer,
      Key: path,
      ACL: 'public-read',
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log('Error', err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
