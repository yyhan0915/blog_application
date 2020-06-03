import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

UserSchema.methods.setPassword = async function (password: string) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password: string) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result; // true / false
};

UserSchema.methods.serialize = function () {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.methods.generateToken = function () {
    const token = jwt.sign(
        { _id: this.id, username: this.username },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    );
    return token;
};
UserSchema.statics.findByUsername = function (username: string) {
    return this.findOne({ username });
};

export interface IUserDocument extends Document {
    username: string;
    password: string;
    setPassword: (password: string) => void;
    checkPassword: (password: string) => boolean;
    serialize: () => void;
    generateToken: () => string;
}
export interface IUserModel extends mongoose.Model<IUserDocument> {
    findByUsername: (username: string) => IUserDocument;
}

const User: IUserModel = mongoose.model<IUserDocument, IUserModel>(
    'User',
    UserSchema
);

export default User;
