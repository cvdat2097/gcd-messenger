import { combineReducers } from 'redux';
import Action from '../actions';

const initialState = {
    MsgInput: {
        message: ''
    },
    Messenger: {
        loadingText: 'More messages',
    }
}

const messengerReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.ACTION_TYPES.CHANGE_INPUT:
            return Object.assign({}, state, {
                MsgInput: {
                    message: action.payload.message
                }
            });

        case Action.ACTION_TYPES.CHANGE_LOADING_TXT:
            return Object.assign({}, state, {
                Messenger: {
                    loadingText: action.payload.loadingText
                }
            });

        default:
            return state;
    }
}



export default combineReducers({
    messengerReducer
});