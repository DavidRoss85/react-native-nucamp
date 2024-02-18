import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/LoadingComponent';
import Main from './screens/MainComponent';


export default function App() {
  return (
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Provider store={store}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </Provider>
    </PersistGate>
  ) 
}
