import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

type decodedType = {
    _id: string;
    username: string;
    exp: number;
};
const jwtMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.access_token;
    if (!token) return next();
    try {
        const decoded: any = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );
        res.locals.user = {
            _id: decoded._id,
            username: decoded.username,
        };
        //token re-issue
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findById(decoded._id);
            const token = user?.generateToken();
            res.cookie('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            });
        }
        console.log(decoded);
        return next();
    } catch (e) {
        //failed to verify token
        return next();
    }
};

export default jwtMiddleware;
