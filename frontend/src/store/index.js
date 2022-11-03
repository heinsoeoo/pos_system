import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import thunk from 'redux-thunk';
import { rootReducer } from "./reducers";

const DEFAULT_STATE = {};

const store = createStore(rootReducer, DEFAULT_STATE, compose(applyMiddleware(thunk)));

export default store;