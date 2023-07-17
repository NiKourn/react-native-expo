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
	const [totalPages, setTotalPages] = useState(1);
	const [Products, setProducts] = useState([]);
    const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

    let limit = 15;
	//get all products listing
	const getProducts = async () => {
		setIsLoading(true);
		let getKey = await AsyncStorage.getItem('key');

		
		const skip = (page - 1) * limit;

		await APIKitDummy.get(`auth/products/?limit=${limit}&skip=${skip}`, {
			headers: {
				Authorization: `Bearer ${getKey}`,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				const { products, total } = res.data;

				setProducts([...Products, ...products]);
				setTotalPages(total);
				setIsLoading(false);
			})
			.catch((e) => {
				console.log('Error Get Products function' + e);
			});
	};

    let allPages = Math.ceil(totalPages / limit);
    const loadMore = () => {
		if (page < totalPages) {
			setPage(page + 1);
		}
	};

   

    useEffect(() => {
        if (page >= allPages + 1) {
			setIsAllDataLoaded(true);
		} else {
			setIsAllDataLoaded(false);
		}
    },[page,totalPages]);

	return (
		<ShopContext.Provider
			value={{
				isLoading,
				getProducts,
				Products,
				loadMore,
                isAllDataLoaded,
				page
			}}>
			{children}
		</ShopContext.Provider>
	);
};

export default ShopProvider;
