import redux from 'redux';

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

export interface loadingStateType {}
export interface userStateType {
    user: null | string;
    checkError: null | string;
}
export interface writeStateType {
    title: string;
    body: string;
    tags: string[];
    post: null | string;
    postError: null | string;
}
