import { createAction } from 'redux-actions';
import createRequestSaga, {
	createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import * as Types from './reduxTypes';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const [
	WRITE_POST,
	WRITE_POST_SUCCESS,
	WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST');

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
export function* writeSaga() {
	yield takeLatest(WRITE_POST as any, writePostSaga);
}

const initialState: Types.writeStateType = {
	title: '',
	body: '',
	tags: [],
	post: null,
	postError: null,
	originalPostId: '',
};

function write(
	state = initialState,
	action: {
		type: any;
		payload: { key: string; value: string; post: string; postError: string };
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
		default:
			return initialState;
	}
}
// const write = handleActions(
//     {
//         [INITIALIZE]: state => initialState,
//         [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
//             ...state,
//             [key]: value,
//         }),
//         [WRITE_POST]: state => ({
//             ...state,
//             post: null,
//             postError: null,
//         }),
//         [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
//             ...state,
//             post,
//         }),
//         [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
//             ...state,
//             postError,
//         }),
//     },
//     initialState
// );

export default write;
