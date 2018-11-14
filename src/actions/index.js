
const ACTION_TYPES = {
    CHANGE_LOADING_TXT: 'CHANGE_LOADING_TXT',
    CHANGE_INPUT: 'CHANGE_INPUT',
    CHANGE_KEYWORD: 'CHANGE_KEYWORD',
    APPLY_FILTER: 'APPLY_FILTER',
    FETCH_MESSAGES: 'FETCH_MESSAGES',
    FETCH_ACTIVE_USERS: 'FETCH_ACTIVE_USERS',
    LOGIN: 'LOGIN'
}

const changeLoadingText = (newLoadingText) => ({
    type: ACTION_TYPES.CHANGE_LOADING_TXT,
    payload: {
        loadingText: newLoadingText,
    }
})

const changeInput = (newInput) => ({
    type: ACTION_TYPES.CHANGE_INPUT,
    payload: {
        message: newInput
    }
});

const changeKeyword = (newKeyword) => ({
    type: ACTION_TYPES.CHANGE_KEYWORD,
    payload: {
        keyword: newKeyword
    }
});

const applyFilter = (keyword, activeUsers) => ({
    type: ACTION_TYPES.APPLY_FILTER,
    payload: {
        activeUsers: activeUsers,
        keyword: keyword
    }
});

const fetchMessage = (messages) => ({
    type: ACTION_TYPES.FETCH_MESSAGES,
    payload: {
        messages
    }
});

const fetchActiveUsers = (activeUsers) => ({
    type: ACTION_TYPES.FETCH_ACTIVE_USERS,
    payload: {
        activeUsers
    }
});

const login = (username, avatar) => ({
    type: ACTION_TYPES.LOGIN,
    payload: {
        username,
        avatar
    }
});

export default {
    ACTION_TYPES,
    changeInput,
    changeLoadingText,
    changeKeyword,
    applyFilter,
    fetchMessage,
    fetchActiveUsers,
    login
}
