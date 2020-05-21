require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require('mongoose');

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const conversationRouter = require("./routes/conversation");
const invitationRouter = require("./routes/invitation");

const { json, urlencoded } = express;

//initial db setup
const dbCredentials = require('./db-credentials.json');
const dbUsername = dbCredentials["dbUsername"];
const dbPwd = dbCredentials["dbPassword"];
const dbUrl= `mongodb+srv://${dbUsername}:${dbPwd}@world-messenger-cluster-lmsnn.mongodb.net/test?retryWrites=true&w=majority`;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/conversations", conversationRouter);
app.use("/invitations", invitationRouter);

//connect to mongodb
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true})
        .then(_res => console.log('Successfully connected to Cloud mongodb'))
        .catch(_err => console.error('Could not connect to Cloud mongodb'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
