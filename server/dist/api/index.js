"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = __importDefault(require("./posts"));
const auth_1 = __importDefault(require("./auth"));
const api = express_1.default.Router();
api.use('/posts', posts_1.default);
api.use('/auth', auth_1.default);
exports.default = api;
//# sourceMappingURL=index.js.map