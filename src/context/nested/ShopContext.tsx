import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKitDummy from '../../API/APIKit';

const defaultContext = {
	isLoading: false,
	getProducts: () => {},
	Products: [],
	loadMore: () => {},
	isAllDataLoaded: false,
	page: 1,
};

export const ShopContext = createContext(defaultContext);

const ShopProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(1);
	const [Products, setProducts] = useState([]);
	const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

	let limit = 15;
	//get all products listing
	const getProducts = async () => {
		setIsLoading(true);
		let getKey = await AsyncStorage.getItem('key');

		const skip = (page - 1) * limit;
console.log('after get key');
		await APIKitDummy.get(`auth/products/?limit=${limit}&skip=${skip}`, {
			headers: {
				Authorization: `Bearer ${getKey}`,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				let { products, total } = res.data;

				setProducts([...Products, ...products]);
				setTotalResults(total);
				setIsLoading(false);
				console.log('inside then')
			})
			.catch((e) => {
				console.log('Error Get Products function' + e);
			});
	};

    let allPages = Math.ceil(totalResults / limit);
    const loadMore = () => {
		if (page < allPages) {
			setPage(page + 1);
			console.log('after setting page' + page);
		}
	};

	useEffect(() => {
		if (page >= allPages + 1) {
			setIsAllDataLoaded(true);
		} else {
			setIsAllDataLoaded(false);
		}
    },[page, totalResults]);

	return (
		<ShopContext.Provider
			value={{
				isLoading,
				getProducts,
				Products,
				loadMore,
				isAllDataLoaded,
				page,
			}}>
			{children}
		</ShopContext.Provider>
	);
};

export default ShopProvider;
