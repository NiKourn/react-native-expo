import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { APIKitDummy, setClientTokenDummy } from '../API/APIKit';
import React, { createContext, useEffect, useState } from 'react';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const defaultContext = {
	isLoading: false,
	userInfo: { key: '', user: { username: '' }, image: '' } || {},
	splashLoading: false,
	register: (name: string, email: string, password: string) => {},
	login: (info: object) => {},
	logout: () => {},
	getProducts: () => {},
	Products: {},
};

export const AuthContext = createContext(defaultContext);

//dummy context for testing
export const AuthProviderDummy = ({ children }) => {
	const [userInfo, setUserInfo] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [splashLoading, setSplashLoading] = useState(false);
	const [Products, setProducts] = useState({});

	const register = (name: string, email: string, password: string) => {
		setIsLoading(true);
		APIKitDummy.post('', {
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
		let dummyCredentials = JSON.stringify({ username: 'atuny0', password: '9uQFF1Lh' });
		setIsLoading(true);
		APIKitDummy.post('auth/login', dummyCredentials, { headers: { 'Content-Type': 'application/json' } })
			.then((res) => {
				let userInfo = res.data;
				userInfo.key = userInfo.token;
				userInfo.user = { username: userInfo.username };
				setClientTokenDummy(userInfo.key);
				setUserInfo(userInfo);
				AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
				AsyncStorage.setItem('key', userInfo.key);
				setIsLoading(false);
			})
			.catch((e) => {
				console.log(`Login error ${e}`);
				setIsLoading(false);
			});
	};

	const logout = async () => {
		let key = await AsyncStorage.getItem('key');
		AsyncStorage.removeItem('userInfo');
		AsyncStorage.removeItem('key');
		setUserInfo({});
		setIsLoading(false);
	};

	const getProducts = async () => {
		setIsLoading(true);

		let getKey = await AsyncStorage.getItem('key').then((res) => {
			return res;
		});

		await APIKitDummy.get('auth/products/?limit=10', { headers: { Authorization: `Bearer ${getKey}`, 'Content-Type': 'application/json' } })
			.then((res) => {
				//setProducts(res.data.products);
				const products = [];
				for (const key in res.data.products) {
					const product = {
						id: key,
						...res.data.products[key], // ... is the spread operator to copy all the key value pairs
					};
					products.push(product);
				}
				setProducts(products);
				setIsLoading(false);
			})
			.catch((e) => {
				console.log('Error Get Products function' + e);
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
				getProducts,
				Products,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
