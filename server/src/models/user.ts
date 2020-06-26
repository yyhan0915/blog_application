import { Schema, Document, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Document Interface

export interface IUserDocument extends Document {
    // properties
    username: string;
    hashedPassword: string;

    //methods
    setPassword: (password: string) => Promise<void>;
    checkPassword: (password: string) => Promise<boolean>;
    serialize: (a: void) => any;
    generateToken: () => string;
}

// Model Interface
export interface IUserModel extends Model<IUserDocument> {
    findByUsername: (username: string) => Promise<IUserDocument>;
}

// Declare Schema
const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

// instance method
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

// static method
UserSchema.statics.findByUsername = function (username: string) {
    return this.findOne({ username });
};

// Declare model
const User: IUserModel = model<IUserDocument, IUserModel>('User', UserSchema);

export default User;
