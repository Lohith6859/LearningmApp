import {call, put} from "redux-saga/effects";
import ApiUser from '../apis/index';


export function* signUpHandler(action){
    
    try{
        const user = yield call(ApiUser.signUp,action)
        if(user.data.STS =="200"){
            yield put({
                type:'SIGNUP_SUCCESS',
                payload:user.data
            });
        }
        else{
            yield put({
                type:'SIGNUP_FAILURE',
                payload:user.data
            });
        }
    }catch(err){
        yield put({
            type:'SIGNUP_FAILURE',
            payload:err
        })
    }
}


export function* logInHandler(action){
    try{

        const user = yield call(ApiUser.fetchUser,action)
        if(user.data.STS == "200"){
            yield put({
                type:'LOGIN_SUCCESS',
                payload:user.data
            })
        }
        else{
            yield put({
                type:'LOGIN_FAILURE',
                payload:user.data
            })
        }
    }catch(err){
        yield put({
            type:'LOGIN_FAILURE',
            payload:err
        })
    }
}

export function* logOutHandler(action){
    try{
        yield put({
            type:'RESETUSER_SUCCESS',
            payload:{}
        })
    }catch(err){
        yield put({
            type:'RESETUSER_FAILURE',
            payload:action.payload
        })
    }
}
export function* languageChooseHandler(action){
    try{
        yield put({
            type:'CHOOSE_LANG_SUCCESS',
            payload:action
        })
    }
    catch(err){
        yield put({
            type:'CHOOSE_LANG_FAILURE',
            payload:err
        })
    }
}
