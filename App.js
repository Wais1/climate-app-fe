import { KeyboardAvoidingView, Platform} from 'react-native';
// Import provider and store for redux toolkit
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'
// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FoodChecker from './screens/FoodChecker';
import CameraScreen from './screens/camera/CameraScreen';
import FoodCheckerResult from './screens/FoodCheckerResult';
import LearnScreen from './screens/LearnScreen';
import Article from './screens/Article';
import FoodForm from './screens/FoodForm';
import SuccessScreen from './screens/SuccessScreen';
import Guidelines from './screens/Guidelines';


export default function App() {
  const Stack = createStackNavigator();

  // To do : 26:58 #5   send photo through API and display response

  return (
    // Redux provider
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          {/* Shifts screen up to keep UI viewable when phone keyboard is active. has flex 1 to keep UI visible. need style.
          handles differently on iOS and android. */}
          <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex:1}}
          // can change offset to -24 possibly
          keyboardVerticalOffset={Platform.OS === "ios" ? -24 : 0}
          >
            {/* Navigation stack (Begins with homescreen)*/}
            <Stack.Navigator>
              <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}} />
              <Stack.Screen name='MapScreen' component={MapScreen} options={{headerShown: false}} />
              <Stack.Screen name='CameraScreen' component={CameraScreen} options={{headerShown: false}} />
              <Stack.Screen name='FoodChecker' component={FoodChecker} options={{headerShown: false}} />
              <Stack.Screen name='FoodCheckerResult' component={FoodCheckerResult} options={{headerShown: false}} />
              <Stack.Screen name='LearnScreen' component={LearnScreen} options={{headerShown: false}} />
              <Stack.Screen name='Article' component={Article} options={{headerShown: false}} />
              <Stack.Screen name='FoodForm' component={FoodForm} options={{headerShown: false}} />
              <Stack.Screen name='SuccessScreen' component={SuccessScreen} options={{headerShown: false}} />
              <Stack.Screen name='Guidelines' component={Guidelines} options={{headerShown: false}} />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}