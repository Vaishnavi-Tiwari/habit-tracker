import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import habitRoutes from "./routes/habits.js";
import webpush from "web-push";
import userRoutes from "./routes/users.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use("/habits", habitRoutes);
app.use("/users", userRoutes);

const connection_url =
  "mongodb+srv://admin:i0vyjCBmtSTNUVqj@cluster0.qsmly.mongodb.net/habit-tracker?retryWrites=true&w=majority";

//DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const publicVapidKey =
  "BN-aM9XMZRGBFK140RiriUB3EsqHISMEBmY401UcBdwOIPA40_wXIt3sg6_gENTdkOi8MfnTm386tOjY97_tF2I";
const privatevapidKey = "02I-8iwFZJ5nSB8hxup0dZIRa5BYJnIYmoXofo0CPYc";

webpush.setVapidDetails(
  "mailto:vikranthshenoy4@gmail.com",
  publicVapidKey,
  privatevapidKey
);

//subscribe Route
//used for sending notification to server

app.post("/subscribe", (req, res) => {
  //Get pushSubsciption object
  const subscription = req.body;
  console.log(subscription.endpoint, "app.js");
  res.status(201).json({});

  //create payload
  const payload = JSON.stringify({ title: "push test" });

  //pass the object into sendNotificartion
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

/*app.get("/worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "worker.js"));
  console.log("app ");
});
app.get("*", function response(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
//Listener*/

app.listen(4000, () => console.log(`Its running on port 4000`));
