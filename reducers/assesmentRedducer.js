const initialState = {} 

export const assesmentReducer = (state=initialState,action) => {
    switch (action.type) {
        case 'GET_LEVEL_ASSMNT_SUCCESS':
            return {
                ...action.payload,
            }
            break;
        case 'GET_LEVEL_ASSMNT_FAILURE':
            return {
                ...action.payload
            }
            break;
    }
    return state
}