import { combineReducers } from 'redux';
import { authenticate } from './auth.reducers';
import { invoicing } from './invoice.reducers';
import { status } from './status.reducers';

export const rootReducer = combineReducers({
    auth: authenticate,
    invoice: invoicing,
    status
});