import { Request, Response, NextFunction } from 'express';

const checkLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user) {
        return res.status(401);
    }
    return next();
};

export default checkLoggedIn;
