import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CertificationProvider } from './contexts/CertificationContext';

import HomeScreen from "./components/HomeScreen";
import QuestionScreen from "./components/QuestionScreen";
import EndOfChapterScreen from "./components/EndOfChapterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CertificationProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Questions" component={QuestionScreen} />
          <Stack.Screen name="Results" component={EndOfChapterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CertificationProvider>
  );
}