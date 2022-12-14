const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = async (event) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (!data.name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Could not update item!",
      }),
    };
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      "#N": "name",
      "#T": "timestamp",
    },
    ExpressionAttributeValues: {
      ":name": data.name,
      ":timestamp": timestamp,
    },
    UpdateExpression: "SET #N = :name, #T = :timestamp",
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        message: "Could not update item!",
      }),
    };
  }
};
