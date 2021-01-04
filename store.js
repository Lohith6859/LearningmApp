import {createStore,applyMiddleware} from 'redux';
import createSagaMiddleware from "redux-saga";
import {rootreducer} from './reducers/index';
import {sagas} from './sagas/sagas'
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootreducer, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(sagas);


const persistConfig ={
    key:'root',
    storage:AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, rootreducer);
let store  = createStore(persistedReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);
let persistor = persistStore(store);

export {store,persistor};