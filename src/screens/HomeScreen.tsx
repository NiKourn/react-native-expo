import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { images } from '../styles/styles';

const HomeScreen = () => {
	const { isLoading, logout, userInfo } = useContext(AuthContext);

	

	return (
		<View style={styles.container}>
			<Spinner visible={isLoading} />
			<Text style={styles.welcome}>Welcome {userInfo ? userInfo.user.username : ''} </Text>
			<Image source={{uri: userInfo.image}} style={images.images}/>
			<Button title="Logout" color="red" onPress={logout} />
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
