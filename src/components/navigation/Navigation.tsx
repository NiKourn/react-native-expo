import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import { AuthContext } from '../../context/AuthContext';
import SplashScreen from '../../screens/SplashScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const NavigationStack = () => {
	const { splashLoading } = useContext(AuthContext);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{splashLoading ? (
					//Splash Screen
					<Stack.Group>
						<Stack.Screen name="Splash Screen" component={SplashScreen} options={{ headerShown: false }} />
					</Stack.Group>
				) : (
					//Auth Screens
					<>
						<Stack.Group>
							<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
							<Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
						</Stack.Group>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export const BottomTabs = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator labeled={false}>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
					}}
				/>
				<Tab.Screen
					name="Logout"
					component={RegisterScreen}
					options={{
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name="logout" color={color} size={26} />,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export function Navigation() {
	const { userInfo } = useContext(AuthContext);
	return !userInfo.key ? <NavigationStack /> : <BottomTabs />;
}

export default Navigation;
