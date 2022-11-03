import { combineReducers } from 'redux';
import { authenticate } from './auth.reducers';

export const rootReducer = combineReducers({
    auth: authenticate
});