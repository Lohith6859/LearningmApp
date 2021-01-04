const initialState = {}

export const levelReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'LEVELREQUEST_SUCCESS':
            // console.log("level success",action.payload)
            return {
                ...action.payload,
            }
            break;
        case 'LEVELREQUEST_FAILURE':
            return {
                ...action.payload,
            }
            break;
        case 'RESETLEVEL_SUCCESS':
            // console.log("action in level reducer")
            return {
                ...action.payload
            }
            break;
        case 'RESETLEVEL_FAILURE':
            return{
                ...action.payload
            }
    }
    return state
}