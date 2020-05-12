import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { games } from './games';
import { comments } from './comments';
import { decors } from './decors';
import { treats } from './treats';
import { favorites } from './favorites';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            games,
            comments,
            treats,
            decors,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}