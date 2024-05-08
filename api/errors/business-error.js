class BusinessError extends Error {
    constructor(code, name, message) {
        super(message)
        this.code = code
        this.name = name
    }
}

export default BusinessError;