let path = require("path");
let conf_file = path.join(__dirname, "./config/dbConfig.js");
let config = require(conf_file);
const routers = require("./routes");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");


//cors
var whiteList = config.WHITELIST;
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whiteList.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
app.use(cors(corsOptionsDelegate));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use("/api/v1/employees", routers.employee);


const PORT = config.PROJECT_PORT;
const PROJECT_HOST = config.PROJECT_HOST;
app.listen(PORT, PROJECT_HOST, () => {
    console.log(`xNet server is running on port http://${PROJECT_HOST}:${PORT}`);
    
  // sendnextFollowUpDateFeedbackReminderEmailCron();
  console.log(`HOSTNAME BY CONFIG EXPORT `, config.PROJECT_HOST);
});
