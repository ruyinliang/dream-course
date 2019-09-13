const express = require('express')
const cors = require('cors')
const path = require('path')

const apiRouter = require('./api')
const {
  failure,
  apiResponseCodes,
  apiResponseMessages
} = require('./helpers/response')

const app = express()

// Initial settings for the Express server.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

const globalErrorHandler = (err, req, res, next) => {
  console.error(err);

  let errorCode = err.code;
  let errorMessage = err.message;
  if (err.code == undefined || err.code == null) {
    errorCode = apiResponseCodes.INTERNAL_ERROR;
    errorMessage = apiResponseMessages.INTERNAL_ERROR;
  }

  res.status(errorCode).send(failure(errorMessage));
};
app.use(globalErrorHandler);

const PORT = process.env.PORT || 4000
app.listen(PORT)