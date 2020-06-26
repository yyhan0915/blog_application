import mongoose, { Schema, Document } from 'mongoose';

// Document Interface
export interface IPostDocument extends Document {
    title: string;
    body: string;
    tags: string[];
    publishedDate: {
        type: Date;
    };
    user: {
        _id: mongoose.Types.ObjectId;
        username: string;
    };
}

const PostSchema: Schema = new Schema({
    title: String,
    body: String,
    tags: [String],
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
});

const Post = mongoose.model<IPostDocument>('Post', PostSchema);

export default Post;
