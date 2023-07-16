import React, { useContext, useEffect, useState } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
	ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { APIKitDummy } from '../API/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, images } from '../styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const Products = () => {
	const { Products, userInfo, getProducts, isLoading } =
		useContext(AuthContext);

	useEffect(() => {
		getProducts();
	}, []);

	const myListEmpty = () => {
		return (
			<View style={{ alignItems: 'center' }}>
				<Text style={styles.item}>No data found</Text>
			</View>
		);
	};

	let list = (
		//let list = Products.map((product) => (
		// <Text key={product.id} > {product.title}</Text>
		//));
		<FlatList columnWrapperStyle={styles.flatList}
			data={Products}
			numColumns={4}
			ListEmptyComponent={myListEmpty}
			ListHeaderComponent={() => (
				<Text
					style={{
						fontSize: 30,
						textAlign: 'left',
						marginTop: 20,
						marginBottom: 10,
						fontWeight: 'bold',
					}}>
					Our Products
				</Text>
			)}
			renderItem={({ item }) => 
			<View style={styles.product}>
			<Image source={{uri:item.thumbnail}} style={images.images} />
			<Text key={item.id}>{item.title}</Text>
			</View>}
		/>
	);

	return <SafeAreaView style={styles.safeArea}>{list}</SafeAreaView>;
};

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	welcome: {
// 		fontSize: 18,
// 		marginBottom: 8,
// 	},
// });

export default Products;
