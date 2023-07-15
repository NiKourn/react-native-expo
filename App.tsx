import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import {Navigation} from './src/components/navigation/Navigation';
import { AuthProviderDummy } from './src/context/AuthContext';
import { useContext } from 'react';


export default function App() {
	return (
		<AuthProviderDummy>
			<View style={styles.container}>
				<StatusBar style="auto" />
				<Navigation />
			</View>
		</AuthProviderDummy>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
    flexDirection: 'row',
	},
});
