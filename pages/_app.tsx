import { TypeComponentAuthFields } from '@/shared/types/auth.types';
import type { AppProps } from 'next/app';
import MainProvider from 'providers/MainProvider';

import '../app/assets/styles/globals.scss';

export type TypeAppProps = AppProps & TypeComponentAuthFields

function MyApp({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	);
}

export default MyApp;
