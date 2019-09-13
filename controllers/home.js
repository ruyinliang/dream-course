const {
  success
} = require("../helpers/response");

const requestContent = (req, res, next) => {
  try {
    res.send(success('hi'))
  }
  catch (err) {
    next(err)
  }
}

module.exports = {
  requestContent
}