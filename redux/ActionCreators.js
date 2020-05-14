import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


//Comments----------------------------------------------------------------------------------------------
export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postComment = (gameId, rating, author, text) => dispatch => {
    const newComment = {gameId, rating, author, text, date: new Date().toISOString()};

    setTimeout(() => {
        dispatch(addComment(newComment))
    }, 1000)
}


export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})

//Games---------------------------------------
export const fetchGames = () => dispatch => {

    dispatch(gamesLoading());

    return fetch(baseUrl + 'games')
        .then(response => {
                if (response.ok) {
                return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(games => dispatch(addGames(games)))
        .catch(error => dispatch(gamesFailed(error.message)));
};

export const gamesLoading = () => ({
    type: ActionTypes.GAMES_LOADING
});

export const gamesFailed = errMess => ({
    type: ActionTypes.GAMES_FAILED,
    payload: errMess
});

export const addGames = games => ({
    type: ActionTypes.ADD_GAMES,
    payload: games
});


//Decors----------------------------------------------------------------------------------------------
export const fetchDecors = () => dispatch => {
    
    dispatch(decorsLoading());

    return fetch(baseUrl + 'decors')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(decors => dispatch(addDecors(decors)))
        .catch(error => dispatch(decorsFailed(error.message)));
};

export const decorsLoading = () => ({
    type: ActionTypes.DECORS_LOADING
});

export const decorsFailed = errMess => ({
    type: ActionTypes.DECORS_FAILED,
    payload: errMess
});

export const addDecors = decors => ({
    type: ActionTypes.ADD_DECORS,
    payload: decors
});

//Treats----------------------------------------------------------------------------------------------
export const fetchTreats = () => dispatch => {
    
    dispatch(treatsLoading());

    return fetch(baseUrl + 'treats')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(treats => dispatch(addTreats(treats)))
        .catch(error => dispatch(treatsFailed(error.message)));
};

export const treatsLoading = () => ({
    type: ActionTypes.TREATS_LOADING
});

export const treatsFailed = errMess => ({
    type: ActionTypes.TREATS_FAILED,
    payload: errMess
});

export const addTreats = treats => ({
    type: ActionTypes.ADD_TREATS,
    payload: treats
});

//Favorites-------------------------------------

export const postFavorite = gameId => dispatch => {
    setTimeout(() => {
        dispatch(addFavorite(gameId));
    }, 2000);
}

export const addFavorite = gameId => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: gameId
});

export const deleteFavorite = gameId => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: gameId
});