require("dotenv").config()

const AWS = require('aws-sdk');
AWS.config.update({region: 'REGION'});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const queueURL = process.env.SQS_QUEUE_URL;

const params = {
 AttributeNames: [
    "SentTimestamp"
 ],
 MaxNumberOfMessages: 10,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: queueURL,
 VisibilityTimeout: 20,
 WaitTimeSeconds: 0
};

sqs.receiveMessage(params, (err, data) => {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    console.log(data.Messages[0].Body)

    const deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };

    sqs.deleteMessage(deleteParams, (err, data) => {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  } else {
    console.log("Message empty")
  }
});