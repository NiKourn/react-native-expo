import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
	const { userInfo, splashLoading } = useContext(AuthContext);

  // useEffect(() => {
  //   userInfo ? console.log(userInfo) : console.log('no user info');
  // }, [userInfo]);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{splashLoading ? (
					<Stack.Screen name="Splash Screen" component={SplashScreen} options={{ headerShown: false }} />
				) : Object.keys(userInfo).length > 0 ? (
					<Stack.Screen name="Home" component={HomeScreen} />
				) : (
					<>
						<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
						<Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
