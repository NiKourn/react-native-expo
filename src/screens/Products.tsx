import React, { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { APIKitDummy } from '../API/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Products = () => {
	const { Products, userInfo, getProducts, isLoading } = useContext(AuthContext);
	const [Key, setKey] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getProducts();
	}, []);
	return (
		<View style={styles.container}>
			<Text>{
				
			JSON.stringify(Products)
			}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	welcome: {
		fontSize: 18,
		marginBottom: 8,
	},
});

export default Products;
