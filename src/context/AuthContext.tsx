import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { setClientToken } from '../API/APIKit';
import React, { createContext, useEffect, useState } from 'react';

const defaultContext = {
	isLoading: false,
	userInfo: { key: '', user: { username: '' } } || {},
	splashLoading: false,
	register: (name: string, email: string, password: string) => {},
	login: (info: object) => {},
	logout: () => {},
};

export const AuthContext = createContext(defaultContext);

export const AuthProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [splashLoading, setSplashLoading] = useState(false);

	const register = (name: string, email: string, password: string) => {
		setIsLoading(true);
		APIKit.post('api/auth', {
			name,
			email,
			password,
		})
			.then((res) => {
				let userInfo = res.data;
				setUserInfo(userInfo);
				AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
				setIsLoading(false);
				console.log(userInfo);
			})
			.catch((e) => {
				console.log(`register error ${e}`);
				setIsLoading(false);
			});
	};

	const login = (info: object) => {
		setIsLoading(true);
		APIKit.post('api/auth', info)
			.then((res) => {
				let userInfo = res.data;
				setClientToken(userInfo.key);
				setUserInfo(userInfo);
				AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
				AsyncStorage.setItem('key', JSON.stringify(userInfo.key));
				setIsLoading(false);
			})
			.catch((e) => {
				console.log(`login error ${e}`);
				setIsLoading(false);
			});
	};

	const logout = async () => {
		let key = await AsyncStorage.getItem('key');

		APIKit.post(
			'api/auth/logout',
			{ 'X-API-KEY': JSON.parse(key), grant_type: 'bearer' }
			// {
			//   headers: {Authorization: `Bearer ${userInfo}`},
			// },
		)
			.then((res) => {
				console.log(res.data);
				AsyncStorage.removeItem('userInfo');
				AsyncStorage.removeItem('key');
				setUserInfo({});
				setIsLoading(false);
			})
			.catch((e) => {
				console.log(`logout error ${e}`);
				AsyncStorage.removeItem('userInfo');
				AsyncStorage.removeItem('key');
			});
	};

	const loggedIn = async () => {
		try {
			setSplashLoading(true);

			let userInfo = await AsyncStorage.getItem('userInfo');
			userInfo = JSON.parse(userInfo);

			if (userInfo) {
				setUserInfo(userInfo);
			}

			setSplashLoading(false);
		} catch (e) {
			setSplashLoading(false);
			console.log(`is logged in error ${e}`);
		}
	};
	//making connection persistent when refreshing AsyncStorage
	useEffect(() => {
		loggedIn();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoading,
				userInfo,
				splashLoading,
				register,
				login,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
