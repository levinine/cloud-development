const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const https = require("https");
const express = require("express");
const cors = require("cors");
const { Consumer } = require("sqs-consumer");

const app = express();
const port = 3001;

dotenv.config();
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

let messages = [];

app.get("/get-messages", (req, res, next) => {
  res.setHeader("content-type", "text/application/json");
  res.writeHead(200);
  res.end(JSON.stringify(messages));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const sqsConfig = {
  apiVersion: "2012-11-05",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: "us-east-1",
};

AWS.config.update(sqsConfig);

const createConsumer = function (queueUrl, batchSize, handler) {
  return Consumer.create({
    queueUrl: queueUrl,
    batchSize: batchSize,
    handleMessageBatch: handler,
    sqs: new AWS.SQS({
      httpOptions: {
        agent: new https.Agent({
          keepAlive: true,
        }),
      },
    }),
  });
};

const doThisWithMessages = (newMessages) => {
  messages = [...messages, ...newMessages];
};

const sampleConsumer = createConsumer(
  "https://sqs.us-east-1.amazonaws.com/CHANGEME",
  1,
  doThisWithMessages // handler for messages
);

sampleConsumer.start();
console.log("Server started!");
