"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.check = exports.login = exports.register = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const user_1 = __importDefault(require("../../models/user"));
exports.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        username: joi_1.default.string().alphanum().min(3).max(20).required(),
        password: joi_1.default.string().required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).end(JSON.stringify(result.error));
    }
    const { username, password } = req.body;
    try {
        const exists = yield user_1.default.findByUsername(username);
        if (exists) {
            return res.status(409).end();
        }
        const user = new user_1.default({
            username,
        });
        yield user.setPassword(password); // 비밀번호 설정
        yield user.save(); // 데이터베이스에 저장
        const token = user.generateToken();
        res.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
        res.end(JSON.stringify(user.serialize()));
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.end();
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401);
    }
    try {
        const user = yield user_1.default.findByUsername(username);
        if (!user) {
            return res.status(401);
        }
        const valid = yield user.checkPassword(password);
        if (!valid) {
            return res.status(401);
        }
        const token = user.generateToken();
        res.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
        res.status(200);
        res.end(JSON.stringify(user.serialize()));
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.end();
    }
});
exports.check = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    if (!user) {
        return res.status(401).end();
    }
    res.end(JSON.stringify(user));
});
exports.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('access_token');
    res.status(204);
    res.end();
});
//# sourceMappingURL=auth.ctrl.js.map