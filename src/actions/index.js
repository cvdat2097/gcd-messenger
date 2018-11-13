
const ACTION_TYPES = {
    CHANGE_LOADING_TXT: 'CHANGE_LOADING_TXT',
    CHANGE_INPUT: 'CHANGE_INPUT',
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

export default {
    ACTION_TYPES,
    changeInput,
    changeLoadingText
}
