const initialState = {}

export const userProgressReducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'UPDATEUSERPROG_SUCCESS':
            return {
                ...action.payload,
            }
            break;
        case 'UPDATEUSERPROG_FAILURE':
            return {
                ...action.payload,
            }
            break;
        case 'SETUSERPROG_SUCCESS':
            return {
                ...action.payload
            }
            break;
        case 'SETUSERPROG_FAILURE':
            return {
                ...action.payload
            }
            break;
        case 'RESETUSER_PROG_SUCCESS':
            return {
                ...action.payload
            }
            break;
        case 'RESETUSER_PROG_FAILURE':
            return {
                ...action.payload
            }
            break;
    }
    
    return state
}


