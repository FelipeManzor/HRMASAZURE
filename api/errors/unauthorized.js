import BusinessError from "./business-error.js";

class UnauthorizedError extends BusinessError {
  constructor(message) {
    super(401, "Unauthorized", message);
  }
}

export default UnauthorizedError;
