const initialState = {}

export const userReducer = (state=initialState,action)=>{
    //  console.log("reducer",action.type)
    switch(action.type){
        case 'SIGNUP_SUCCESS':
            return {
                ...action.payload,
                isRegistered:true
            }
            break;
        case 'SIGNUP_FAILURE':
            return {
                ...action.payload,
                isRegistered:false
            }
            break;
        case 'LOGIN_SUCCESS':
            return {
                ...action.payload,
                isLogedIN:true
            }
            break;
        case 'LOGIN_FAILURE':
            return{
                ...action.payload,
                isLogedIN:false
            }
            break;
        case 'RESETUSER_SUCCESS':
            // console.log("action in user reducer")
            return {
                ...action.payload
            }
            break;
        case 'RESETUSER_FAILURE':
            return{
                ...action.payload
            }

        case 'CHOOSE_LANG_SUCCESS':
            return{
                ...action.payload,
                isLanguageChosen:true
            }
            break;
        case 'CHOOSE_LANG_FAILURE' :
            return{
                ...action.payload,
                isLanguageChosen:false
            }
            break;
    }
    return state
}