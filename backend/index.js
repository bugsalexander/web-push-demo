const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const webpush = require("web-push");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/publickey", (req, res) =>
  res.send(JSON.stringify(process.env.PUBLICKEY))
);

const dummyDb = { subscription: null }; //dummy in memory store

const saveToDatabase = async (subscription) => {
  // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
  // Here you should be writing your db logic to save it.
  dummyDb.subscription = subscription;
};

// The new /save-subscription endpoint
app.post("/save-subscription", async (req, res) => {
  const subscription = req.body;
  console.log(subscription);
  await saveToDatabase(subscription); //Method to save the subscription to Database
  res.json({ message: "success" });
});

const vapidKeys = {
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY,
};

//setting our previously generated VAPID keys
webpush.setVapidDetails(
  "mailto:takayama.a@northeastern.edu",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend) => {
  webpush.sendNotification(subscription, dataToSend);
};

//route to test send notification
app.get("/send-notification", (req, res) => {
  const subscription = dummyDb.subscription; //get subscription from your databse here.
  if (subscription) {
    const message = "Hello World";
    sendNotification(subscription, message);
    res.json({ message: "message sent" });
    console.log("message sent");
  } else {
    res.json({ message: "unable to send notification: no subscriptions" });
    console.log("unable to send notification: no subscriptions");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
