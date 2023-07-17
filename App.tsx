import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { Navigation } from './src/components/navigation/Navigation';
import GlobalContext from './src/context/GlobalContext';

export default function App() {
	return (
		<>
			<GlobalContext>
				<View style={styles.container}>
					<StatusBar style="auto" />
					<Navigation />
				</View>
			</GlobalContext></>
		
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
