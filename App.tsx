import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import Loading from './src/components/Loading';
import SignIn from './src/Screens/SignIn';

export default function App() {
  const [ fontLoaded ] = useFonts({ Roboto_400Regular, Roboto_700Bold})
  return (
    <NativeBaseProvider>
      <StatusBar 
        translucent
        style="light"
      />
      {!fontLoaded ? <Loading /> : <SignIn />}
    </NativeBaseProvider>
  );
}
