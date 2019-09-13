const sendForbiddenErrorResponse = (req, res) => {
  res.status(apiResponseCodes.FORBIDDEN).json(
    failure(apiResponseMessages.INVALID_AUTH_TOKEN)
  );
};

const success = result => {
  let response = {
    success: true,
    message: apiResponseMessages.SUCCESS
  };

  if (Array.isArray(result)) {
    response["results"] = result;
  }
  else if (typeof result === "object") {
    response["result"] = result;
  }
  else if (typeof result === "string") {
    response["message"] = result;
  }
  else if (result != undefined && result != null) {
    response["result"] = {
      result
    };
  }

  return response;
};

const failure = errorMessage => {
  let message = errorMessage;

  if (!errorMessage || errorMessage.length === 0) {
    message = "An error has occurred";
  }

  let response = {
    success: false,
    message: message
  };

  return response;
};

const error = (code, message) => {
  return {
    code,
    message
  };
};

const formattingError = () => {
  const err = error(
    apiResponseCodes.INTERNAL_ERROR,
    apiResponseMessages.FORMATTING_ERROR
  );
  return err;
};

const apiResponseCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500
};

const apiResponseMessages = {
  SUCCESS: "Success",
  INTERNAL_ERROR:
    "Our crew accidentally made rainbow bubbles. Please hold on while we rectify the error",
  DATABASE_QUERY_ERROR:
    "Database Error",
  FORMATTING_ERROR:
    "Formatting Error",
  RECORD_NOT_FOUND: "%s is not found in database",
  MISSING_FIELD: "Missing %s field",
  MISSING_AUTH_TOKEN: "No Authentication Token found",
  INVALID_AUTH_TOKEN: "Invalid Authentication Token",
  INVALID_ACCOUNT: "Account does not exist"
};

module.exports = {
  sendForbiddenErrorResponse,
  success,
  failure,
  error,
  formattingError,
  apiResponseCodes,
  apiResponseMessages
};