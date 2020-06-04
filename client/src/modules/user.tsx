import { createAction } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
	createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as Types from './reduxTypes';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
	'user/CHECK'
);

const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, (user: any) => user);

export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
	try {
		localStorage.removeItem('user');
	} catch (e) {
		console.log('localStorage is not working');
	}
}

function* logoutSaga() {
	try {
		yield call(authAPI.logout);
		localStorage.removeItem('user');
	} catch (e) {
		console.log(e);
	}
}
export function* userSaga() {
	yield takeLatest(CHECK as any, checkSaga);
	yield takeLatest(CHECK_FAILURE, checkFailureSaga);
	yield takeLatest(LOGOUT, logoutSaga);
}

const initialState: Types.userStateType = {
	user: null,
	checkError: null,
};

function user(
	state = initialState,
	action: { type: any; payload: { user: any; error: any } }
) {
	switch (action.type) {
		case TEMP_SET_USER:
			return {
				...state,
				user: action.payload.user,
			};
		case CHECK_SUCCESS:
			return {
				...state,
				user: action.payload.user,
				checkError: null,
			};
		case CHECK_FAILURE:
			return {
				...state,
				user: null as null,
				checkError: action.payload.error,
			};

		case LOGOUT:
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
}
// const user = handleActions(
// 	{
// 		[TEMP_SET_USER]: (state, { payload: user }) => ({
// 			...state,
// 			user,
// 		}),
// 		[CHECK_SUCESS]: (state, { payload: user }) => ({
// 			...state,
// 			user,
// 			checkError: null,
// 		}),
// 		[CHECK_FAILURE]: (state, { payload: error }) => ({
// 			...state,
// 			user: null,
// 			checkError: error,
// 		}),
// 		[LOGOUT]: state => ({
// 			...state,
// 			user: null,
// 		}),
// 	},
// 	initialState
// );

export default user;
