import { combineReducers } from 'redux';
import {userReducer} from './user_reducer';
import {levelReducer} from './level_reducer'
import { levelContentReducer } from './levelContent_reducer';
import { userProgressReducer } from './userProg_reducer';
import { quizzReducer } from './quizzReducer';
import {assesmentReducer} from './assesmentRedducer'
export const rootreducer = combineReducers({
    user:userReducer,
    levelsData:levelReducer,
    levelContent: levelContentReducer,
    userProgress: userProgressReducer,
    quizzData: quizzReducer,
    assesmentData:assesmentReducer
})