import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context imports
import { CertificationProvider } from './contexts/CertificationContext';

// Pages imports
import HomeScreen from "./components/HomeScreen";
import QuestionScreen from "./components/QuestionScreen";
import EndOfChapterScreen from "./components/EndOfChapterScreen";
import ModeSelectionScreen from "./components/ModeSelectionScreen";
import ViewAnswersScreen from "./components/ViewAnswersScreen";
import SettingScreen from "./components/SettingsScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CertificationProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Questions" component={QuestionScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Results" component={EndOfChapterScreen} />
          <Stack.Screen name="Mode select" component={ModeSelectionScreen} />
          <Stack.Screen name="Answers" component={ViewAnswersScreen} />
          <Stack.Screen name="Settings" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CertificationProvider>
  );
}