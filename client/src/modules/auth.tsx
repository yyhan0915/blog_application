import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
	createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest, actionChannel } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import * as Types from './reduxTypes';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
	'auth/REGISTER'
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
	'auth/LOGIN'
);

export const changeField = createAction(
	CHANGE_FIELD,
	({ form, key, value }: Types.auth_changeFieldPayload) => ({
		form, // register , login
		key, // username, password, passwordConfirm
		value, // 실제 바꾸려는 값
	})
);
export const initializeForm = createAction(
	INITIALIZE_FORM,
	(form: any) => form // register/login
);
export const register = createAction(
	REGISTER,
	({ username, password }: Types.auth_userAccountPayload) => ({
		username,
		password,
	})
);

export const login = createAction(
	LOGIN,
	({ username, password }: Types.auth_userAccountPayload) => ({
		username,
		password,
	})
);

//create Saga
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
	yield takeLatest(REGISTER as any, registerSaga);
	yield takeLatest(LOGIN as any, loginSaga);
}

const initialState: Types.authStateType = {
	register: {
		username: '',
		password: '',
		passwordConfirm: '',
	},
	login: {
		username: '',
		password: '',
	},
	auth: null,
	authError: null,
};

function auth(
	state = initialState,
	action: {
		type: string;
		payload: {
			form: string;
			key: string | number;
			value: string | number;
			auth: string | number;
			error: string | number | boolean;
		};
	}
) {
	switch (action.type) {
		case CHANGE_FIELD: {
			let newState = { register: state.register, login: state.login };
			return {
				...newState,
				[action.payload.form]: {
					...[action.payload.form],
					[action.payload.key]: action.payload.value,
				},
			};
			// let newState = { ...state };
			// newState[action.payload.form];
			// return produce(state, draft => {
			// 	draft[action.payload.form][action.payload.key] = action.payload.value; // 예: state.register.username을 바꾼다
		}
		case INITIALIZE_FORM:
			return {
				...state,
				[action.payload.form]: state[action.payload.form],
				authError: null,
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				authError: null as null,
				auth: action.payload.auth,
			};
		case REGISTER_FAILURE:
			return { ...state, authError: action.payload.error };
		case LOGIN_SUCCESS:
			return { ...state, authError: null, auth: action.payload.auth };
		case LOGIN_FAILURE:
			return { ...state, authError: action.payload.error };
		default:
			return state;
	}
}

// const auth = handleActions(
// 	{
// 		[CHANGE_FIELD]: (
// 			state: any,
// 			{ payload: { form, key, value } }: Types.auth_changeFieldPayload_
// 		) =>
// 			produce(state, (draft: { [x: string]: { [x: string]: any } }) => {
// 				draft[form][key] = value; // 예: state.register.username을 바꾼다
// 			}),
// 		[INITIALIZE_FORM]: (state: any, { payload: form }) => ({
// 			...state,
// 			[form]: initialState[form],
// 			authError: null, // 폼 전환 시 회원 인증 에러 초기화
// 		}),
// 		// 회원가입 성공
// 		[REGISTER_SUCCESS]: (state: any, { payload: auth }) => ({
// 			...state,
// 			authError: null,
// 			auth,
// 		}),
// 		// 회원가입 실패
// 		[REGISTER_FAILURE]: (state: any, { payload: error }) => ({
// 			...state,
// 			authError: error,
// 		}),
// 		// 로그인 성공
// 		[LOGIN_SUCCESS]: (state: any, { payload: auth }) => ({
// 			...state,
// 			authError: null,
// 			auth,
// 		}),
// 		// 로그인 실패
// 		[LOGIN_FAILURE]: (state: any, { payload: error }) => ({
// 			...state,
// 			authError: error,
// 		}),
// 	},
// 	initialState
// );

export default auth;
