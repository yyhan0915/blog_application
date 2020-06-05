"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postCtrl = __importStar(require("./posts.ctrl"));
const checkLoggedIn_1 = __importDefault(require("../../lib/checkLoggedIn"));
const posts = express_1.default.Router();
posts.get('/', postCtrl.list);
posts.post('/', checkLoggedIn_1.default, postCtrl.write);
posts.get('/:id', postCtrl.getPostById, postCtrl.read);
posts.delete('/:id', checkLoggedIn_1.default, postCtrl.getPostById, postCtrl.checkOwnPost, postCtrl.remove);
posts.patch('/:id', checkLoggedIn_1.default, postCtrl.checkOwnPost, postCtrl.getPostById, postCtrl.update);
exports.default = posts;
//# sourceMappingURL=index.js.map