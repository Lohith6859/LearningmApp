const initialState = {}

export const levelContentReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LEVELCONTENT_SUCCESS':
            return {
                ...action.payload,   
            }
            break;
        case 'LEVELCONTENT_FAILURE':
            return{
                ...action.payload,
            }
            break;
        case 'RESETLEVELCONTENT_SUCCESS':
            // console.log("action in level content reducer")
            return {
                ...action.payload
            }
            break;
        case 'RESETLEVELCONTENT_FAILURE':
            return{
                ...action.payload
            }
    }
    return state
}