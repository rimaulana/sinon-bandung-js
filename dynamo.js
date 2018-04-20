const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'blablabla',
  secretAccessKey: 'abc',
  region: 'us-west-2',
});

const documentClient = new AWS.DynamoDB.DocumentClient({ endpoint: new AWS.Endpoint('http://localhost:8000') });

const isUserNameExist = (username, callback) => {
  documentClient.scan(
    {
      TableName: 'user',
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: { ':username': username },
    },
    callback,
  );
};

const addUser = (params, callback) => {
  isUserNameExist(params.username, (error, data) => {
    if (error) {
      callback(error, null);
    } else if (data.Count > 0) {
      callback(new Error('username is not available'), null);
    } else {
      documentClient.put(
        {
          TableName: 'user',
          Item: params,
        },
        callback,
      );
    }
  });
};

module.exports = {
  isUserNameExist,
  addUser,
};
