import AuthProviderDummy from './nested/AuthContext';
import ShopProvider from './nested/ShopContext';

const GlobalContext = ({children}) => {

    return(
        <>
	<AuthProviderDummy>
		<ShopProvider>
            {children} 
        </ShopProvider>
	 </AuthProviderDummy>
     </>
    );
};

export default GlobalContext;
