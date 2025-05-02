import AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-west-1', // Change this to your region
});

const docClient = new AWS.DynamoDB.DocumentClient();

export default docClient;
