import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKitDummy from '../../API/APIKit';

const defaultContext = {
	isLoading: false,
	getProducts: () => {},
	pagedProducts: [],
	loadMore: () => {},
	getPaginatedProducts: () => {},
	isAllDataLoaded: false,
	page: 1,
	productsArray: [],
};

export const ShopContext = createContext(defaultContext);

const ShopProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(1);
	const [productsArray, setProductsArray] = useState([]);
	const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
	const [pagedProducts, setPagedProducts] = useState([]);

	const paginationLimit = 15;

	// Get all products listing
	const getProducts = async () => {
		setIsLoading(true);
		let getKey = await AsyncStorage.getItem('key');

		// const skip = (page - 1) * limit;

		await APIKitDummy.get(`auth/products?limit=0`, {
			headers: {
				Authorization: `Bearer ${getKey}`,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				const { products, total } = res.data;
				// Calculate the start and end indexes for the current page
				console.log(products.length);
				setProductsArray(products);
				setTotalResults(total);
				setIsLoading(false);
				console.log('getProducts');
			})
			.catch((e) => {
				console.log('Error Get Products function' + e);
			});
	};

	let allPages = Math.ceil(totalResults / paginationLimit);
	// useEffect(() => {
	// 	// Call getPaginatedProducts whenever productsArray changes
	// 	getPaginatedProducts();
	//   }, [page]); // Include 'page' in the dependency array to handle loadMore

	const getPaginatedProducts = () => {
		const startIndex = (page - 1) * paginationLimit;
		const endIndex = page * paginationLimit;

		// Slice the products array for the current page
		let slicedProducts = productsArray.slice(startIndex, endIndex);
		setPagedProducts([...slicedProducts]);
		console.log('getPaginatedProducts');
		// Check if all pages are loaded
		if (page >= allPages) {
			setIsAllDataLoaded(true);
		} else {
			setIsAllDataLoaded(false);
		}
	};

	const loadMore = () => {
		// if (isLoading || isAllDataLoaded) {
		// 	// If data is already loading, return early to prevent multiple calls
		// 	return;
		// }

		if (page < allPages) {
			setPage(page + 1);
		}
	};

	return (
		<ShopContext.Provider
			value={{
				isLoading,
				getProducts,
				pagedProducts,
				getPaginatedProducts,
				loadMore,
				isAllDataLoaded,
				page,
				productsArray,
			}}>
			{children}
		</ShopContext.Provider>
	);
};

export default ShopProvider;
