const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = async (event) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  try {
    /* 
    SCAN operation should not be used with large tables
    because it can consume large amounts of system resources
     */
    const result = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        message: "Could not list items!",
      }),
    };
  }
};
