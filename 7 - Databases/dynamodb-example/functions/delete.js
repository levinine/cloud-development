const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = async (event) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ReturnValues: "ALL_OLD",
  };

  try {
    const deletedItem = await dynamoDb.delete(params).promise();
    console.log(JSON.stringify(deletedItem));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Item deleted!",
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        message: "Item not deleted!",
      }),
    };
  }
};
