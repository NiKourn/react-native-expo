import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { setClientToken } from '../API/APIKit';
import React, { createContext, useEffect, useState } from 'react';

let defaultContext = {
	isLoading: false,
	userInfo: {},
	splashLoading: false,
	register: {},
	login: undefined,
	logout: undefined,
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
    AsyncStorage.removeItem('userInfo');
		    AsyncStorage.removeItem('key');
		    setUserInfo({});
		    setIsLoading(false);
		
		APIKit
		  .post(
		    'api/auth/logout',
		    {'key': JSON.parse(key)},
		    {
		      headers: {Authorization: `Bearer ${userInfo}`},
		    },
		  )
		  .then(res => {
		    console.log(res.data);
		    AsyncStorage.removeItem('userInfo');
		    AsyncStorage.removeItem('key');
		    setUserInfo({});
		    setIsLoading(false);
		  })
		  .catch(e => {
		    console.log(`logout error ${e}`);
		    AsyncStorage.removeItem('userInfo');

		  });
	};

	const isLoggedIn = async () => {
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

	useEffect(() => {
		isLoggedIn();
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
