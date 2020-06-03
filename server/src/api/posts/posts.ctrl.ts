import express, { Request, Response, NextFunction } from 'express';
import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const { ObjectId } = mongoose.Types;

export const getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).end();
        }
        res.locals.post = post;
        return next();
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    }
};
export const write = async (req: Request, res: Response) => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
    });

    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).end(result.error);
    }

    const { title, body, tags } = req.body;
    const post = new Post({ title, body, tags, user: res.locals.user });
    try {
        await post.save();
        return res.end();
    } catch (e) {
        return res.status(500).end(e);
    }
};
export const list = async (req: Request, res: Response) => {
    const page = parseInt((req.query.page as string) || '1', 10);
    if (page < 1) {
        return res.status(400).end();
    }

    const { tag, username } = req.query;

    const query = {
        ...(username ? { 'user.username': username } : {}),
        ...(tag ? { tags: tag } : {}),
    };
    try {
        const posts = await Post.find(query)
            .sort({ _id: -1 })
            .skip((page - 1) * 10)
            .limit(10)
            .exec();
        const postCount: number = await Post.countDocuments(query).exec();
        res.set('Last-Page', Math.ceil(postCount / 10).toString());
        res.json(
            posts
                .map(post => post.toJSON())
                .map(post => ({
                    ...post,
                    body:
                        post.body.length < 200
                            ? post.body
                            : `${post.body.slice(0, 200)}...`,
                }))
        );
        res.status(200);
        res.end();
        return null;
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    }
};
export const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).exec();
        if (!post) {
            return res.status(404).end();
        }
        return res.status(200).end(JSON.stringify(res.locals));
    } catch (e) {
        return res.status(500).end(e);
    }
};
export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        return res.status(204).end();
    } catch (e) {
        return res.status(500).end(e);
    }
};

export const update = async (req: Request, res: Response) => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
    });

    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).end(result.error);
    }
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndUpdate(id, req.body, {
            new: true,
        }).exec();
        if (!post) {
            return res.status(404).end();
        }
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    }
};

export const checkOwnPost = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.write(JSON.stringify(res.locals));
    const { user, post } = res.locals;
    if (post.user._id.toString() !== user._id) {
        return res.status(403);
    }
    return next();
};
