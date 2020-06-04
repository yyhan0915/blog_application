import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
	createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import * as Types from './reduxTypes';

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
		tags: string[];
		username: string;
		page: number;
	}) => ({ tag, username, page })
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postAPI.listPosts);
export function* postsSaga() {
	yield takeLatest(LIST_POSTS as any, listPostsSaga);
}

const initialState: Types.postsStateType = {
	posts: null,
	error: null,
};

const posts = handleActions(
	{
		[LIST_POSTS_SUCCESS]: (state, { payload: posts }) => ({ ...state, posts }),
		[LIST_POSTS_FAILURE]: (state, { payload: error }) => ({ ...state, error }),
	},
	initialState
);

export default posts;
