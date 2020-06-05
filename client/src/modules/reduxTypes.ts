import redux from 'redux';
//auth
export interface authStateType {
    [id: string]: object | string | null;
}

export type auth_changeFieldPayload = {
    form?: string;
    key?: string;
    value?: string;
};
export type auth_changeFieldPayload_ = {
    payload: { form: string; key: string; value: string };
};
export type auth_userAccountPayload = {
    username: string;
    password: string;
};
//loading
export interface loadingStateType {}
//user
export interface userStateType {
    user: { user: string; username: string };
    checkError: null | string;
}
//write
export interface writeStateType {
    title: string;
    body: string;
    tags: string[];
    post: { _id: number; user: { username: string } };
    postError: null | string;
    originalPostId: string | number;
}

// posts
export interface postStateType {
    post: {
        title: string;
        body: string;
        user: {
            _id: string;
            username: string;
        };
        _id: string;
        publishedDate: string;
        tags: string[];
        __v?: number;
        error?: {
            response:
                | any
                | {
                      status: number;
                  };
        };
    };
    error: any;
}

//posts
export interface postsStateType {
    posts: postStateType['post'][];
    error: null | any;
}
