import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import * as Types from './reduxTypes';
import { ParsedQs } from 'qs';

const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POSTS');

export const listPosts = createAction(
    LIST_POSTS,
    ({
        tag,
        username,
        page,
    }: {
        tag: string | string[] | ParsedQs | ParsedQs[];
        username: string | string[] | ParsedQs | ParsedQs[];
        page: string | string[] | ParsedQs | ParsedQs[];
    }) => ({ tag, username, page })
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* postsSaga() {
    yield takeLatest(LIST_POSTS as any, listPostsSaga);
}

const initialState: Types.postsStateType = {
    posts: [
        {
            user: {
                _id: '5ed4137c6f1d2528145f339b',
                username: 'yyhan2059',
            },
            tags: ['tag1', 'tag2'],
            _id: '5ed95478b4aa8c22cdb58a5e',
            title: 'sample1',
            body: 'smaplebody',
            publishedDate: '2020-06-04T20:07:20.991Z',
            __v: 0,
        },
        {
            user: {
                _id: '5ed4137c2226f1d2528145f339b',
                username: 'yyhan0915',
            },
            tags: ['tag1', 'tag2'],
            _id: '5ed95478b4aa8c22cdb58a5e',
            title: 'sample2',
            body: 'smaplebody',
            publishedDate: '2020-06-04T20:07:20.991Z',
            __v: 0,
        },
    ],
    error: null,
};

function posts(
    state = initialState,
    action: { type: string; payload: { posts: any; error: any } }
) {
    switch (action.type) {
        case LIST_POSTS_SUCCESS:
            return { ...state, posts: action.payload.posts };
        case LIST_POSTS_FAILURE:
            return { ...state, error: action.payload.error };
        default:
            return initialState;
    }
}

export default posts;
