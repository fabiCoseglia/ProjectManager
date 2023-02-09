const errorResponse = require("../helpers/errorResponse")
const {verify} = require('jsonwebtoken');
const User = require('../database/models/User');
const createHttpError = require("http-errors");

module.exports= async (req,res,next) => { 
    
    try {

        if(!req.headers.authorization){
            throw createHttpError(401,"Token is required");
        }

        const token = req.headers.authorization;
        const decoded = verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id).select("name")

        next()
        
    } catch (error) {
        return errorResponse(res,error, "CHECK-TOKEN")
    }
}