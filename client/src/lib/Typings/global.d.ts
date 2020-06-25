import { Store as ReduxStore } from 'redux';

import { RootState } from '../../modules/index';
import * as Types from '../../modules/reduxTypes';

declare global {
    interface RootState {
        auth: Types.authStateType;
        loading: Types.loadingStateType;
        user: Types.userStateType;
        write: Types.writeStateType;
        post: Types.postStateType;
    }

    interface Window {
        store?: ReduxStore<RootState>;
    }
}
