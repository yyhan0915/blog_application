import { IUserDocument, IUserModel } from './../../models/user';
import express, { Request, Response } from 'express';
import Joi from '@hapi/joi';
import User from '../../models/user';

export const register = async (req: Request, res: Response) => {
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).end(JSON.stringify(result.error));
    }

    const { username, password } = req.body;
    try {
        const exists = await User.findByUsername(username);
        if (exists) {
            return res.status(409).end();
        }
        const user = new User({
            username,
        });
        await user.setPassword(password); // 비밀번호 설정
        await user.save(); // 데이터베이스에 저장

        const token = user.generateToken();
        res.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
        res.end(JSON.stringify(user.serialize()));
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
};
export const login = async (req: Request, res: Response) => {
    console.log('req is ', req.body);
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401);
    }
    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(401).end('user is not existed');
        }
        const valid = await user.checkPassword(password);
        if (!valid) {
            return res.status(401).end('password is wrong');
        }

        const token = user.generateToken();
        res.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
        console.log(user.serialize());
        res.status(200);
        res.end(JSON.stringify(user.serialize()));
    } catch (e) {
        console.log(e);
        res.status(500);
        res.end();
    }
};
export const check = async (req: Request, res: Response) => {
    const { user } = res.locals;
    if (!user) {
        return res.status(401).end();
    }
    res.end(JSON.stringify(user));
};
export const logout = async (req: Request, res: Response) => {
    res.clearCookie('access_token');
    res.status(204);
    res.end();
};
