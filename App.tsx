import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import Loading from './src/components/Loading';
import Routes from './src/routes';
import AuthContextProvider from './src/contexts/AuthContext';

export default function App() {
  const [ fontLoaded ] = useFonts({ Roboto_400Regular, Roboto_700Bold})
  return (
    <NativeBaseProvider>
      <StatusBar 
        style="light"
        translucent
      />
      <AuthContextProvider>
        {!fontLoaded ? <Loading /> : <Routes />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
