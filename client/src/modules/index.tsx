import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import * as Types from './reduxTypes';

const rootReducer = combineReducers({
	auth,
	loading,
	user,
	write,
	post,
	posts,
});

export function* rootSaga() {
	yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga()]);
}

//rootReducer & type of rootReducer
export default rootReducer;
export type RootState = {
	auth: Types.authStateType;
	loading: Types.loadingStateType;
	user: Types.userStateType;
	write: Types.writeStateType;
	post: Types.postStateType;
};
