import {call, put} from "redux-saga/effects";
import ApiUser from '../apis/index';

export function* setUserProgressHandler(action) {
    try {
        yield put({
            type: 'SETUSERPROG_SUCCESS',
            payload:action.payload
        })
    } catch (err) {
        yield put({
            type: 'SETUSERPROG_FAILURE',
            payload:err
        })        
    }
}

export function* updateProgressHandler(action) {
    try {
        const userProgress = yield call(ApiUser.updateUserProgress, action)
        if (userProgress.data.STS == '200') {
            yield put({
                type: 'UPDATEUSERPROG_SUCCESS',
                payload: userProgress.data
            });
        }
        else {
            yield put({
                type: 'UPDATEUSERPROG_FAILURE',
                payload: userProgress.data
            });
        }
    } catch (err) {
        yield put({
            type: 'UPDATEUSERPROG_FAILURE',
            payload: err
        });
    }
}

export function* resetUserProgressHandler(action){
    try{
        yield put({
            type:'RESETUSER_PROG_SUCCESS',
            payload:{}
        })
    }catch(err){
        yield put({
            type:'RESETUSER_PROG_FAILURE',
            payload:action.payload
        })
    }
}

