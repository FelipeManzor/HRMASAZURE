import BusinessError from "../errors/business-error.js";

/**
 * General error handler
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export function ErrorHandler(err, req, res, next) {
    if (err instanceof BusinessError) {
        res.status(err.code).json(`${err.name}: ${err.message}`);
    }else {
        console.log(err.stack);
        res.status(500).json(`Server error: ${err.message}`);
    }
}

/**
 * request handler try-catch wrapper
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} func 
 */
export async function Wrapper(req, res, next, func) {
    try {
        await func(req,res,next)
    } catch(e){
        next(e)
    }
}