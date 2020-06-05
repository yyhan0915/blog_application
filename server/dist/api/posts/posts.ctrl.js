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
exports.checkOwnPost = exports.update = exports.remove = exports.read = exports.list = exports.write = exports.getPostById = void 0;
const post_1 = __importDefault(require("../../models/post"));
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("@hapi/joi"));
const { ObjectId } = mongoose_1.default.Types;
exports.getPostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    try {
        const post = yield post_1.default.findById(id);
        if (!post) {
            return res.status(404).end();
        }
        res.locals.post = post;
        return next();
    }
    catch (e) {
        console.log(e);
        return res.status(500).end();
    }
});
exports.write = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        title: joi_1.default.string().required(),
        body: joi_1.default.string().required(),
        tags: joi_1.default.array().items(joi_1.default.string()).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).end(result.error);
    }
    const { title, body, tags } = req.body;
    const post = new post_1.default({ title, body, tags, user: res.locals.user });
    try {
        yield post.save();
        return res.end();
    }
    catch (e) {
        return res.status(500).end(e);
    }
});
exports.list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page || '1', 10);
    if (page < 1) {
        return res.status(400).end();
    }
    const { tag, username } = req.query;
    const query = Object.assign(Object.assign({}, (username ? { 'user.username': username } : {})), (tag ? { tags: tag } : {}));
    try {
        const posts = yield post_1.default.find(query)
            .sort({ _id: -1 })
            .skip((page - 1) * 10)
            .limit(10)
            .exec();
        const postCount = yield post_1.default.countDocuments(query).exec();
        res.set('Last-Page', Math.ceil(postCount / 10).toString());
        res.json(posts
            .map(post => post.toJSON())
            .map(post => (Object.assign(Object.assign({}, post), { body: post.body.length < 200
                ? post.body
                : `${post.body.slice(0, 200)}...` }))));
        res.status(200);
        res.end();
        return null;
    }
    catch (e) {
        console.log(e);
        return res.status(500).end();
    }
});
exports.read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield post_1.default.findById(id).exec();
        if (!post) {
            return res.status(404).end();
        }
        return res.status(200).end(JSON.stringify(res.locals));
    }
    catch (e) {
        return res.status(500).end(e);
    }
});
exports.remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield post_1.default.findByIdAndRemove(id).exec();
        return res.status(204).end();
    }
    catch (e) {
        return res.status(500).end(e);
    }
});
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object().keys({
        title: joi_1.default.string().required(),
        body: joi_1.default.string().required(),
        tags: joi_1.default.array().items(joi_1.default.string()).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).end(result.error);
    }
    const { id } = req.params;
    try {
        const post = yield post_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        }).exec();
        if (!post) {
            return res.status(404).end();
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).end();
    }
});
exports.checkOwnPost = (req, res, next) => {
    res.write(JSON.stringify(res.locals));
    const { user, post } = res.locals;
    if (post.user._id.toString() !== user._id) {
        return res.status(403);
    }
    return next();
};
//# sourceMappingURL=posts.ctrl.js.map