import { combineReducers } from 'redux';
import { authenticate } from './auth.reducers';
import { invoicing } from './invoice.reducers';

export const rootReducer = combineReducers({
    auth: authenticate,
    invoice: invoicing
});