import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(
	START_LOADING,
	(requestType: string) => requestType
);
export const finishLoading = createAction(
	FINISH_LOADING,
	(requestType: string) => requestType
);

const initialState: RootState['loading'] = {};

const loading = handleActions(
	{
		[START_LOADING]: (state, action) => ({
			...state,
			[action.payload as string]: true,
		}),
		[FINISH_LOADING]: (state, action) => ({
			...state,
			[action.payload as string]: false,
		}),
	},
	initialState
);

export default loading;
