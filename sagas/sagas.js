
import {all,fork,takeEvery} from "redux-saga/effects";
import {signUpHandler,logInHandler,logOutHandler,languageChooseHandler} from './userSaga';
import { getLevelHandler, getLevelContentHandler,resetLevelContentHandler,resetLevelHandler } from './levelSaga';
import { updateProgressHandler, setUserProgressHandler, resetUserProgressHandler } from './userProgressSaga';
import {getLevelAssesmnt,getQuizzz} from './quizSaga'

function* userSignup(){
    yield takeEvery('SIGNUP_REQUEST',signUpHandler);
}
function* languageSaga(){
    yield takeEvery('LANGUAGE_REQUEST',languageChooseHandler)
}

function* userLogin(){
    yield takeEvery('LOGIN_REQUEST',logInHandler);
}
function* userLogout(){
    yield takeEvery('RESETUSER_REQ',logOutHandler);
}
function* levelReset() {
    yield takeEvery('RESETLEVEL_REQ', resetLevelHandler);
}
function* levelContentReset() {
    yield takeEvery('RESETLEVELCONTENT', resetLevelContentHandler);
}
function* levelSaga(){
    yield takeEvery('LEVEL_REQUEST',getLevelHandler);
}
function* levelContentSaga(){
    yield takeEvery('LEVELCONTENT_REQUEST',getLevelContentHandler);
}
function* updateProgress() {
    yield takeEvery('UPDATEUSERPROG_REQUEST', updateProgressHandler);
}
function* resetUserProgSaga() {
    yield takeEvery('RESETUSER_PROG', resetUserProgressHandler);
}

function* setProgressSaga() {
    yield takeEvery('SETUSERPROGRESS', setUserProgressHandler);
}
function* assesmentSaga() {
    yield takeEvery('GET_LEVEL_ASSMNT',getLevelAssesmnt)
}
 
function* quizzSaga() {
    yield takeEvery('GET_QUIZZ_DATA',getQuizzz)
}

export function* sagas(){
    yield all([
        fork(userSignup),
        fork(userLogin),
        fork(userLogout),
        fork(levelReset),
        fork(levelContentReset),
        fork(languageSaga),
        fork(levelSaga),
        fork(levelContentSaga),
        fork(setProgressSaga),
        fork(updateProgress),
        fork(resetUserProgSaga),
        fork(assesmentSaga),
        fork(quizzSaga),
    ])
}