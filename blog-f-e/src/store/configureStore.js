import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import blogsReducer from '../reducers/blogs';
import blogPageReducer from '../reducers/blogPage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            blogs: blogsReducer,
            blogPage: blogPageReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}