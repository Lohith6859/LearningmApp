import {call, put} from "redux-saga/effects";
import ApiUser from '../apis/index';
export function* getQuizzz(action) {
    try {
        const quizzData = yield call(ApiUser.getQizz, action);
        if (quizzData.data.STS === '200') {
            yield put({
                type: 'QUIZZ_DATA_SUCCESS',
                payload:quizzData.data
            })
        } else {
            yield put({
                type: 'QUIZZ_DATA_FAILURE',
                payload:action.payload
            })
        }
    } catch (err) {
        yield put({
            type: 'QUIZZ_DATA_FAILURE',
            payload:err
        })
    }
}

export function* getLevelAssesmnt(action) {
    
    try {
        const quizzData = yield call(ApiUser.getLevelAssesment, action);
        // console.log("data in assesment saga", quizzData)
        if (quizzData.data.STS === '200') {
            // console.log("getlevel assesment saga")
            yield put({
                type: 'GET_LEVEL_ASSMNT_SUCCESS',
                payload:quizzData.data
            })
        } else {
            yield put({
                type: 'GET_LEVEL_ASSMNT_FAILURE',
                payload:action.payload
            })
        }
    } catch (err) {
        yield put({
            type: 'GET_LEVEL_ASSMNT_FAILURE',
            payload:err
        })
    }
}