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
	const { Products, isLoading, loadMore, isAllDataLoaded } = useContext(ShopContext);
	const [areImagesLoaded, setImagesLoaded] = useState(false);

	const handleImageLoad = () => {
	  setImagesLoaded(true);
	};

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
			<Image source={{ uri: item.thumbnail }} style={images.images} onLoad={handleImageLoad}/>
			<Text key={item.id}>{item.title}</Text>
		</View>
	);

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
					Our Products||{Products.length}
				</Text>
			)}
			renderItem={renderItem}
			onEndReached={loadMore} // Load more when reaching the end of the list
			onEndReachedThreshold={0.1} // Load more when 50% of the list is scrolled
			ListFooterComponent={<Spinner visible={!isAllDataLoaded && isLoading} />} // Show spinner at the bottom when loading more
		/>
	);

	return <SafeAreaView style={styles.safeArea}>{list}</SafeAreaView>;
};

export default Products;
