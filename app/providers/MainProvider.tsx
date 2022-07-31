import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';



import AuthProvider from './AuthProvider/AuthProvider';
import HeadProvider from './HeadProvider/HeadProvider';
import ReduxToast from './ReduxToast';
import Layout from '@/components/layout/Layout';
import { store } from '@/store/store';
import { TypeAppProps } from '../../pages/_app';
import { TypeRoles } from '@/shared/types/auth.types';


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

interface MainProviderProps {
	children?: React.ReactNode;
	Component: TypeRoles
}

const MainProvider: FC<MainProviderProps> = ({ children, Component}) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					<AuthProvider Component={Component}/>
					<Layout>{children}</Layout>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	);
};

export default MainProvider;