import BusinessError from "./business-error.js";

class ForbiddenError extends BusinessError {
  constructor(message) {
    super(403, "Access denied", message);
  }
}

export default ForbiddenError;
