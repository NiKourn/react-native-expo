import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Logout = ({ navigation }) => {
	const { logout } = useContext(AuthContext);
	useEffect(() => {
		logout();
	});

	return null;
};

export default Logout;
