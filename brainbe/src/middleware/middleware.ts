import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
export const userMiddleware = (req:Request,res:Response,next:NextFunction) =>{
   
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string,JWT_SECRET);

    if(decoded){
        // @ts-ignore
        req.userRef= decoded.id;
        next()
    }
    else{
        res.status(403).json({
            message: "Unauthorised Access"
        })
    }
}
