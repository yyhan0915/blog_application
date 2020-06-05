"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkLoggedIn = (req, res, next) => {
    if (!res.locals.user) {
        return res.status(401);
    }
    return next();
};
exports.default = checkLoggedIn;
//# sourceMappingURL=checkLoggedIn.js.map