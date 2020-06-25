import { createAction, handleActions } from 'redux-actions';
// import {
//     createStandardAction,
//     ActionType,
//     createReducer,
// } from 'typesafe-actions';

const START_LOADING = 'loading/START_LOADING' as string;
const FINISH_LOADING = 'loading/FINISH_LOADING' as string;

// export const startLoading = createStandardAction<string>(START_LOADING)();
// export const finishLoading = createStandardAction<string>(FINISH_LOADING)();
// const actions = { startLoading, finishLoading };
// type LoadingAction = ActionType<typeof actions>;
// const loading = createReducer<RootState['loading'], LoadingAction>(
//     initialState,
//     {
//         [START_LOADING]: (state, action) => ({
//             ...state,
//             [action.payload]: true,
//         }),
//         [FINISH_LOADING]: (state, action) => ({
//             ...state,
//             [action.payload]: false,
//         }),
//     }
// );
const initialState: RootState['loading'] = {};
export const startLoading = createAction(
    START_LOADING,
    (requestType: string) => requestType
);
export const finishLoading = createAction(
    FINISH_LOADING,
    (requestType: string) => requestType
);

type loadingAction =
    | ReturnType<typeof startLoading>
    | ReturnType<typeof startLoading>;

function loading(state = initialState, action: loadingAction) {
    switch (action.type) {
        case START_LOADING:
            return { ...state, [action.payload]: true };
        case FINISH_LOADING:
            return { ...state, [action.payload]: false };
        default:
            return { ...state };
    }
}
// const loading = handleActions(
//     {
//         [START_LOADING]: (state, action) => ({
//             ...state,
//             [action.payload]: true,
//         }),
//         [FINISH_LOADING]: (state, action) => ({
//             ...state,
//             [action.payload]: false,
//         }),
//     },
//     initialState
// );

export default loading;
