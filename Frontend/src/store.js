import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import {logger} from 'redux-logger'

const initialState = {};
const middleware = [thunk];
//applyMiddleware(logger))
const store = createStore(
	rootReducer,
	applyMiddleware(...middleware,logger)
	// compose(
		// applyMiddleware(...middleware, logger),
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
)

export default store;
