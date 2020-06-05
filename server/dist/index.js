"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = __importDefault(require("./api"));
const jwtMiddleware_1 = __importDefault(require("./lib/jwtMiddleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const app = express_1.default();
//dotenv Setting
const { PORT, MONGO_URI } = process.env;
// DB Setting
mongoose_1.default
    .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch(e => console.log(e));
// Settings
app.use(cookie_parser_1.default());
app.use(express_session_1.default({
    secret: '5b7d1848ef4235c83dc73dd7f4b0ed5c6879ded6955e5b8396aae5ddc80e1caa',
    resave: false,
    saveUninitialized: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(jwtMiddleware_1.default);
// Routing
app.use('/api', api_1.default);
const port = PORT || 4000;
app.listen(port, () => console.log(`server is running at ${port}!`));
//# sourceMappingURL=index.js.map