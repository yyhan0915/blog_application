import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

import * as Types from './reduxTypes';
// import { check } from './user';

const CHANGE_FIELD = 'auth/CHANGE_FIELD' as const;
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM' as const;

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
    'auth/REGISTER'
);

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
// const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
//     'auth/LOGIN'
// );

// create Action
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

export const loginSaga = ({ username, password }: any) => async (
    dispatch: any
) => {
    dispatch({ type: LOGIN });
    try {
        await authAPI.login({ username, password });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: true,
        });
    } catch (e) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: e,
            error: true,
        });
    }
};
// const loginSaga = createRequestSaga(LOGIN, authAPI.login);
// action type
type AuthAction =
    | ReturnType<typeof changeField>
    | ReturnType<typeof initializeForm>
    | ReturnType<typeof register>
    | ReturnType<typeof login>;
// create Saga
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
// const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
    yield takeLatest(REGISTER as any, registerSaga);
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

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form as string][key as string] = value; // 예: state.register.username을 바꾼다
            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form as any]: initialState[form as any],
            authError: null, // 폼 전환 시 회원 인증 에러 초기화
        }),
        // 회원가입 성공
        [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        // 회원가입 실패
        [REGISTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
        // 로그인 성공
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        // 로그인 실패
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
    },
    initialState
);

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
