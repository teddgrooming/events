import { StatusBar } from 'expo-status-bar';
import { useFonts as useOswald, Oswald_600SemiBold } from '@expo-google-fonts/oswald';
import { useFonts as useInter, Inter_400Regular } from '@expo-google-fonts/inter';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  const [oswaldLoaded] = useOswald({ Oswald_600SemiBold });
  const [interLoaded] = useInter({ Inter_400Regular });

  if (!oswaldLoaded || !interLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <RootNavigator />
    </>
  );
}
