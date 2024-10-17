// services/S3Service.js
import {
    S3Client,
    ListObjectsV2Command,
    DeleteObjectCommand,
  } from '@aws-sdk/client-s3';
  
  const REGION = process.env.REACT_APP_AWS_REGION;
  const ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
  const BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME;



//   console.log('AWS Access Key:', process.env.REACT_APP_AWS_ACCESS_KEY_ID);
//   console.log('AWS Secret Access Key:', process.env.REACT_APP_AWS_SECRET_ACCESS_KEY);
//   console.log('AWS Region:', process.env.REACT_APP_AWS_REGION);
//   console.log('S3 Bucket Name:', process.env.REACT_APP_S3_BUCKET_NAME);
  

  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });
  
  const S3Service = {
    listObjects: async (prefix = '') => {
      try {
        const command = new ListObjectsV2Command({
          Bucket: BUCKET_NAME,
          Prefix: prefix,
        });
        const response = await s3Client.send(command);
        return response.Contents || [];
      } catch (error) {
        console.error('Error listing S3 objects:', error);
        throw error;
      }
    },
  
    deleteObject: async (key) => {
      try {
        const command = new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
        });
        await s3Client.send(command);
      } catch (error) {
        console.error('Error deleting S3 object:', error);
        throw error;
      }
    },
  };
  
  export default S3Service;
  