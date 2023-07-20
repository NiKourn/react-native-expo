import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { ShopContext } from '../context/nested/ShopContext';
import { styles, images } from '../styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const Products = () => {
  const { productsArray, pagedProducts, isLoading, loadMore, isAllDataLoaded, page, getProducts, getPaginatedProducts } = useContext(ShopContext);
  const [areImagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
	getProducts();
		console.log(productsArray.length);
	  
	
  }, []); // Call 'getProducts' whenever 'page' changes

  useEffect(() => {
	getPaginatedProducts();

  }, [page, productsArray]);

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
      <Image source={{ uri: item.thumbnail }} style={images.images} onLoad={handleImageLoad} />
      <Text key={item.id}>{item.title}</Text>
    </View>
  );


//   console.log(pagedProducts);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        columnWrapperStyle={styles.flatList}
        data={pagedProducts}
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
            }}
          >
            Products||{pagedProducts.length}
          </Text>
        )}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.001}
        ListFooterComponent={<Spinner visible={!isAllDataLoaded && isLoading} />}
      />
    </SafeAreaView>
  );
};

export default Products;
