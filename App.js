import React from 'react';
import {store,persistor} from './store';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import NavigationPage from './Screens/NavigationPage';


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationPage/>
      </PersistGate>
    </Provider>
  )
}

