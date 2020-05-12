import * as ActionTypes from './ActionTypes';

export const treats = (state = { isLoading: true,
                                    errMess: null,
                                    treats: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TREATS:
            return {...state, isLoading: false, errMess: null, treats: action.payload};

        case ActionTypes.TREATS_LOADING:
            return {...state, isLoading: true, errMess: null, treats: []}

        case ActionTypes.TREATS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};