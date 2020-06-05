import { createAction } from 'redux-actions';
import createRequestSaga, {
	createRequestActionTypes,
} from '../lib/createRequestSaga';
import { ReactText } from 'react';

import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

import * as Types from './reduxTypes';

const INITIALIZE = 'write/INITIALIZE';
const SET_ORIGINAL_POST = 'write/SET_ORGINAL_POST';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const [
	WRITE_POST,
	WRITE_POST_SUCCESS,
	WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST');
const [
	UPDATE_POST,
	UPDATE_POST_SUCCESS,
	UPDATE_POST_FAILURE,
] = createRequestActionTypes('write/UPDATE_POST');

export const updatePost = createAction(
	UPDATE_POST,
	({
		id,
		title,
		body,
		tags,
	}: {
		id: ReactText | string;
		title: string;
		body: string;
		tags: string[];
	}) => ({ id, title, body, tags })
);
export const setOriginalPost = createAction(
	SET_ORIGINAL_POST,
	(post: any) => post
);
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(
	CHANGE_FIELD,
	({ key, value }: { key: string; value: string[] }) => ({
		key,
		value,
	})
);
export const writePost = createAction(
	WRITE_POST,
	({ title, body, tags }: { title: string; body: string; tags: string[] }) => ({
		title,
		body,
		tags,
	})
);

//creating saga
const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postAPI.updatePost);
export function* writeSaga() {
	yield takeLatest(WRITE_POST as any, writePostSaga);
	yield takeLatest(UPDATE_POST as any, updatePostSaga);
}

const initialState: Types.writeStateType = {
	title: '',
	body: '',
	tags: [],
	post: null,
	postError: null,
	originalPostId: null,
};

function write(
	state = initialState,
	action: {
		type: string;
		payload: {
			key: string;
			value: string;
			post: { title: string; body: string; tags: string; _id: string };
			postError: any;
		};
	}
) {
	switch (action.type) {
		case INITIALIZE:
			return { ...initialState };
		case CHANGE_FIELD:
			return { ...state, [action.payload.key]: action.payload.value };
		case WRITE_POST:
			return { ...state, post: null, postError: null };
		case WRITE_POST_SUCCESS:
			return { ...state, post: action.payload.post };
		case WRITE_POST_FAILURE:
			return { ...state, postError: action.payload.postError };
		case SET_ORIGINAL_POST:
			return {
				...state,
				title: action.payload.post.title,
				body: action.payload.post.body,
				tags: action.payload.post.tags,
				originalPostId: action.payload.post._id,
			};
		case UPDATE_POST_SUCCESS:
			return { ...state, post: action.payload.post };
		case UPDATE_POST_FAILURE:
			return { ...state, postError: action.payload.postError };
		default:
			return initialState;
	}
}

export default write;
