import * as ActionTypes from './ActionTypes';

export const decors = (state = { isLoading: true,
                                        errMess: null,
                                        decors: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DECORS:
            return {...state, isLoading: false, errMess: null, decors: action.payload};

        case ActionTypes.DECORS_LOADING:
            return {...state, isLoading: true, errMess: null, decors: []}

        case ActionTypes.DECORS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};