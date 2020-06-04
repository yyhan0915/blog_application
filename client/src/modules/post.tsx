import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
	createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import * as Types from './reduxTypes';

const [
	READ_POST,
	READ_POST_SUCCESS,
	READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');

const UNLOAD_POST = 'post/UNLOAD_POST';

export const readPost = createAction(READ_POST, (id: string) => id);
export const unloadPost = createAction(UNLOAD_POST);

const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
export function* postSaga() {
	yield takeLatest(READ_POST as any, readPostSaga);
}

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
			return { ...state, post: action.payload.post };
		default:
			return { ...state };
	}
}

export default post;
