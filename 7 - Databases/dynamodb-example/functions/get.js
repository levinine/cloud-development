const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = async (event) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    // for composite primary key, you have to provide both partition and sort key
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      "#N": "name",
    },
    ProjectionExpression: "#N, last_name",
  };

  console.log(params);

  try {
    const result = await dynamoDb.get(params).promise();
    if (!result.Item)
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Item does not exist!",
        }),
      };
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        message: "Could not get item!",
      }),
    };
  }
};
