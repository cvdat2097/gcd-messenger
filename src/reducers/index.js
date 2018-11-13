import { combineReducers } from 'redux';
import Action from '../actions';

const messengerInitialState = {
    MsgInput: {
        message: ''
    },
    Messenger: {
        loadingText: 'More messages',
    }
}

const messengerReducer = (state = messengerInitialState, action) => {
    switch (action.type) {
        case Action.ACTION_TYPES.CHANGE_INPUT:
            return Object.assign({}, state, {
                MsgInput: action.payload
            });

        case Action.ACTION_TYPES.CHANGE_LOADING_TXT:
            return Object.assign({}, state, {
                Messenger: action.payload
            });

        default:
            return state;
    }
}

// ============ SIDEBAR REDUCER ==============

const sidebarInitialState = {
    SearchBar: {
        keyword: ''
    },
    SidePanel: {
        activeUsers: [],
        keyword: ''
    }
}

const sidebarReducer = (state = sidebarInitialState, action) => {
    switch (action.type) {
        case Action.ACTION_TYPES.CHANGE_KEYWORD:
            return Object.assign({}, state, { SearchBar: action.payload });

        case Action.ACTION_TYPES.APPLY_FILTER:
            return Object.assign({}, state, { SidePanel: action.payload });

        default:
            return state;
    }
}

export default combineReducers({
    messengerReducer,
    sidebarReducer
});