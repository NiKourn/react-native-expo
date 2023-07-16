import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	wrapper: {
		width: '80%',
	},
	safeArea:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: '100%',
	},
	flatList:{
		flex: 1,
		alignContent: 'center',
		justifyContent: "space-evenly"
	},
	product:{
		width: '18%',
		height: 'auto',
		marginBottom: 40,
		// borderColor: '#bbb',
		// borderWidth: 1,
	},
	input: {
		marginBottom: 12,
		borderWidth: 1,
		borderColor: '#bbb',
		borderRadius: 5,
		paddingHorizontal: 14,
	},
	link: {
		color: 'blue',
	},
	item: {
		padding: 20,
		marginTop: 5,
		fontSize: 15,
	  },
});

export const images = StyleSheet.create({
	images: {
		width: 70,
		height: 70,
	},
});
