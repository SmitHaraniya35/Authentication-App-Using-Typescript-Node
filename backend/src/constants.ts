export const ERROR_MESSAGES = {
  MONGO_CONNECTION_ERR: "MongoDB connection failed",
  INVALID_CREDENTIALS: "Invalid credentials",
  INVALID_USER_ID:"Invaid user id",
  USER_EXIST: "User already exists",
  USER_NOT_EXIST: "User not exists",
  USER_ID_MISSING: "User id is missing",
  USERS_NOT_FOUND: "Users not found",
  ACCESS_TOKEN_MISSING: "Access token is missing",
  REFRESH_TOKEN_MISSING: "Refresh token is missing",
  ACCESS_TOKEN_INVALID: "Invalid or expired access token", 
  REFRESH_TOKEN_INVALID: "Invalid or expired refresh token", 
  INPUT_VALIDATION_ERROR: "Input validation error",
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Not Authorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Not Found",
  INTERNAL_SERVER_ERROR: "Internal Server Error"
};

export const SUCCESS_MESSAGES = {
  OK: "Success",
  CREATED: "Created",

  USER_CREATED: "User registered successfully",
  USER_FETCHED: "User fetched successfully",
  USERS_DATA_FETCHED_SUCCESS: "User data fetched successfully",

  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  
  ACCESS_TOKEN_SUCCESS: "Access token generated successfully",
};

export const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};