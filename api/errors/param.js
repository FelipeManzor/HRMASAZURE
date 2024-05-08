import BusinessError from "./business-error.js";

class ParamError extends BusinessError {
  constructor(message) {
    super(400, "Invalid Param", message);
  }
}

export default ParamError;
