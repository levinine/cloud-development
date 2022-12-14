const uuid = require("uuid");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event) => {
  console.log("Event: ", JSON.stringify(event));

  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (!data.name && !data.last_name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Could not create item!",
      }),
    };
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      name: data.name,
      last_name: data.last_name,
      timestamp,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Item created!",
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        message: "Item not created!",
      }),
    };
  }
};
