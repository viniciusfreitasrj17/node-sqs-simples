require("dotenv").config()

const AWS = require('aws-sdk');
AWS.config.update({region: 'sa-east-1'});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const queueURL = process.env.SQS_QUEUE_URL;

const params = {
  DelaySeconds: 10,
  MessageAttributes: {
    "Title": {
      DataType: "String",
      StringValue: "The Day"
    },
    "Author": {
      DataType: "String",
      StringValue: "John Grisham"
    }
  },
  MessageBody: `Day ${new Date()}`,
  QueueUrl: queueURL
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});