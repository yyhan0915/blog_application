import { createAction } from 'redux-actions';
// import { takeLatest } from 'redux-saga/effects';

// import createRequestSaga, {
//     createRequestActionTypes,
// } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';

import * as Types from './reduxTypes';

const READ_POST = 'post/READ_POST' as const;
const READ_POST_SUCCESS = 'post/READ_POST_SUCCESS' as const;
const READ_POST_FAILURE = 'post/READ_POST_FAILURE' as const;
const UNLOAD_POST = 'post/UNLOAD_POST' as const;

export const readPost = (id: any) => async (dispatch: any) => {
    dispatch({ type: READ_POST });
    try {
        const response = await postsAPI.readPost(id);
        dispatch({
            type: READ_POST_SUCCESS,
            payload: response.data,
        });
    } catch (e) {
        dispatch({ type: READ_POST_FAILURE, payload: e, error: true });
        throw e;
    }
};

export const unloadPost = createAction(UNLOAD_POST);
// const [
//     READ_POST,
//     READ_POST_SUCCESS,
//     READ_POST_FAILURE,
// ] = createRequestActionTypes('post/READ_POST');

// const UNLOAD_POST = 'post/UNLOAD_POST';

// export const readPost = createAction(READ_POST, (id: string) => id);
// export const unloadPost = createAction(UNLOAD_POST);

// const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
// export function* postSaga() {
//     yield takeLatest(READ_POST as any, readPostSaga);
// }

const initialState: Types.postStateType = {
    post: null,
    error: null,
};

function post(
    state = initialState,
    action: { type: string; payload: { post: string; error: any } }
) {
    switch (action.type) {
        case READ_POST_SUCCESS:
            return { ...state, post: action.payload.post };
        case READ_POST_FAILURE:
            return { ...state, error: action.payload.error };
        case UNLOAD_POST:
            return { ...initialState };
        default:
            return { ...state };
    }
}

export default post;
