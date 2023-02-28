import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import PostsReducer from './reducers/posts';
import AuthReducer from './reducers/auth';

import App from './App';

import './index.css'

const rootReducer = combineReducers({
    posts: PostsReducer,
    auth: AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDom.render(app, document.getElementById('root'));