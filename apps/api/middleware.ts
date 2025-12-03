import { nanoseconds } from "bun";
import type { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: {
        userId: string,
        username: string
    }
};

// middleware function

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "Unauthorized:No token provided"
            })
        }

        const token = authHeader.split(" ")[1];

        // Verify the token

        const decoded = jwt.verify(token, process.env.JWT_SECREAT!) as {
            userId: string;
            username: string;
        }

        //Attach the paylod to request

        req.user = {
            userId: decoded.userId,
            username: decoded.username
        }
        // return control to the controller
        next()

    } catch (error) {
        console.log("Auth Middleware Error",error);
        return res.status(401).json({
            message:"Unauthorized:Invalid jwt token"
        })
    }
}
