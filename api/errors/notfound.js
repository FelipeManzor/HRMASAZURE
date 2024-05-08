import BusinessError from "./business-error.js";

class NotFoundError extends BusinessError {
  constructor(message) {
    super(404, "Not Found", message);
  }
}

export default NotFoundError;
