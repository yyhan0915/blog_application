// import { createAction, handleActions } from 'redux-actions';
import { ActionType, createReducer } from 'typesafe-actions';

const START_LOADING = 'loading/START_LOADING' as const;
const FINISH_LOADING = 'loading/FINISH_LOADING' as const;

export const startLoading = (requestType: string) => ({
    type: START_LOADING,
    payload: requestType,
});
export const finishLoading = (requestType: string) => ({
    type: FINISH_LOADING,
    payload: requestType,
});
// export const startLoading = createAction(START_LOADING)<string>();
// export const finishLoading = createAction(FINISH_LOADING)<string>();

const actions = { startLoading, finishLoading };
type LoadingAction = ActionType<typeof actions>;

const initialState: RootState['loading'] = {};
const loading = createReducer<RootState['loading'], LoadingAction>(
    initialState,
    {
        [START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true,
        }),
        [FINISH_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: false,
        }),
    }
);
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

// export const startLoading = createAction(
//     START_LOADING,
//     (requestType: string) => requestType
// );
// export const finishLoading = createAction(
//     FINISH_LOADING,
//     (requestType: string) => requestType
// );

// type loadingAction =
// 	| ReturnType<typeof startLoading>
// 	| ReturnType<typeof startLoading>;

// function loading(state = initialState, action: loadingAction) {
// 	switch (action.type) {
// 		case START_LOADING:
// 			return { ...state, [action.payload]: true };
// 		case FINISH_LOADING:
// 			return { ...state, [action.payload]: false };
// 		default:
// 			return { ...state };
// 	}
// }
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
