// import { ActionType, createReducer } from 'typesafe-actions';
// import { takeLatest } from 'redux-saga/effects';
// import { createAction } from 'redux-actions';

// import createRequestSaga, {
//     createRequestActionTypes,
// } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';

import * as Types from './reduxTypes';

const LIST_POSTS = 'posts/LIST_POSTS' as const;
const LIST_POSTS_SUCCESS = 'posts/LIST_POSTS_SUCCESS' as const;
const LIST_POSTS_FAILURE = 'posts/LIST_POSTS_FAILURE' as const;

export const listPosts = ({ tag, username, page }: any) => async (
    dispatch: any
) => {
    dispatch({ type: LIST_POSTS });
    try {
        const response = await postsAPI.listPosts({ tag, username, page });
        dispatch({
            type: LIST_POSTS_SUCCESS,
            payload: response.data,
        });
    } catch (e) {
        dispatch({ type: LIST_POSTS_FAILURE, payload: e, error: true });
        throw e;
    }
};
// const [
//     LIST_POSTS,
//     LIST_POSTS_SUCCESS,
//     LIST_POSTS_FAILURE,
// ] = createRequestActionTypes('posts/LIST_POSTS');

// export const listPosts = createAction(LIST_POSTS)<{
//     tag: string | string[] | ParsedQs | ParsedQs[];
//     username: string | string[] | ParsedQs | ParsedQs[];
//     page: string | string[] | ParsedQs | ParsedQs[];
// }>();

// export const listPosts = createAction(
//     LIST_POSTS,
//     ({
//         tag,
//         username,
//         page,
//     }: {
//         tag: string | string[] | ParsedQs | ParsedQs[];
//         username: string | string[] | ParsedQs | ParsedQs[];
//         page: string | string[] | ParsedQs | ParsedQs[];
//     }) => ({ tag, username, page })
// );

// const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
// export function* postsSaga() {
//     yield takeLatest(LIST_POSTS as any, listPostsSaga);
// }

const initialState: Types.postsStateType = {
    posts: [],
    error: null,
};

function posts(state = initialState, action: { type: any; payload: any }) {
    switch (action.type) {
        case LIST_POSTS_SUCCESS:
            return { ...state, posts: action.payload };
        case LIST_POSTS_FAILURE:
            return { ...state, error: action.payload };
        default:
            return initialState;
    }
}

export default posts;
