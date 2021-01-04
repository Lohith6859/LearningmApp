const initialState = {} 

export const quizzReducer = (state=initialState,action) => {
    switch (action.type) {
        case 'QUIZZ_DATA_SUCCESS':
            return {
                ...action.payload
            }
            break;
        case 'QUIZZ_DATA_FAILURE':
            return {
                ...action.payload
            }
            break;
    }
    return state
}