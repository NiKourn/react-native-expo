import React, { useContext, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import {styles} from '../styles/styles';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const { isLoading, login } = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<Spinner visible={isLoading} />
			<View style={styles.wrapper}>
				<TextInput style={styles.input} value={email} placeholder="Enter email" onChangeText={(text) => setEmail(text)} />

				<TextInput style={styles.input} value={password} placeholder="Enter password" onChangeText={(text) => setPassword(text)} secureTextEntry />

				<Button
					title="Login"
					onPress={() => {
						login({ username: 'nextpixel', password: 'C4p7aw3some!', grant_type: 'bearer' });
					}}
				/>

				<View style={{ flexDirection: 'row', marginTop: 20 }}>
					<Text>Don't have an account? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Register')}>
						<Text style={styles.link}>Register</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default LoginScreen;
