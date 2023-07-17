import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/nested/AuthContext';
import { images } from '../styles/styles';

const HomeScreen = () => {
	const { isLoading, userInfo } = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<Spinner visible={isLoading} />
			<Image source={{uri: userInfo.image}} style={images.images}/>
			<Text style={styles.welcome}>Welcome {userInfo ? userInfo.firstName : ''}! </Text>
			{/* <Button title="Logout" color="red" onPress={logout} /> */}
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

export default HomeScreen;
