import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './screens/MainScreen';
import HomeScreen from './screens/HomeScreen';
import MyPageScreen from './screens/MyPageScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SettingScreen from './screens/SettingScreen';
import FindIdScreen from './screens/FindIdScreen';
import FindPasswordScreen from './screens/FindPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MyPage" component={MyPageScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="FindId" component={FindIdScreen} />
        <Stack.Screen name="FindPassword" component={FindPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>

    
  );
  
}
