import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = (type: string) => {
    const SUCCESS = `auth/${type}_SUCCESS`;
    const FAILURE = `auth/${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type: string, request: any) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function* (action: { payload: any }) {
        yield put(startLoading(type)); //started loading
        try {
            const response = yield call(request, action.payload);
            yield put({ type: SUCCESS, payload: response.data });
        } catch (e) {
            yield put({ type: FAILURE, payload: e, error: true });
        }
        yield put(finishLoading(type)); //finished loading
    };
}
