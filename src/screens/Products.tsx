import React, { useContext, useEffect, useState } from 'react';
import {
	Text,
	View,
	Image,
	FlatList,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { ShopContext } from '../context/nested/ShopContext';
import { styles, images } from '../styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';


const Products = () => {
	const { Products, isLoading, loadMore } = useContext(ShopContext);

	const myListEmpty = () => {
		return (
			<View style={{ alignItems: 'center' }}>
				<Spinner visible={isLoading} />
				<Text style={styles.item}>No data found</Text>
			</View>
		);
	};

	const renderItem = ({ item }) => (
		<View style={styles.product}>
			<Image source={{ uri: item.thumbnail }} style={images.images} />
			<Text key={item.id}>{item.title}</Text>
		</View>
	);

	const renderFooter = () => {
		if (isLoading) {
		  return <Spinner visible={true} />;
		} else {
		  return null;
		}
	  };

	let list = (
		<FlatList
			columnWrapperStyle={styles.flatList}
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
			renderItem={renderItem}
			onEndReached={loadMore} // Load more when reaching the end of the list
			onEndReachedThreshold={0.1} // Load more when 50% of the list is scrolled
			ListFooterComponent={renderFooter} // Show spinner at the bottom when loading more
		/>
	);

	return <SafeAreaView style={styles.safeArea}>{list}</SafeAreaView>;
};

export default Products;
