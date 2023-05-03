const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const headerToken = req.headers.authorization
    let token;
    if(headerToken){
        const splited_token =  headerToken.toString().split(" ")
        if(splited_token[0] === "Bearer"){
            splited_token.map(async (inside_token) => {
                if(inside_token !== "Bearer"){
                    token = inside_token;
                }
            })
        }
        else{
            return next(new ErrorHandler("Please login to access the resource", 401))
        }
        if(!token){
          return next(new ErrorHandler("Please login to access the resource", 401))
        }
    }else{
      return next(new ErrorHandler("Please login to access the resource", 401))
    }

  

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
