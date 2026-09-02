import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { setToken } from '@/entities/track';
import { getAccessToken } from '@/api/spotifyAuth';
import App from '@/App';
import '@/reset.css';
import '@/index.css';

const savedToken = getAccessToken();
if (savedToken) {
	store.dispatch(setToken(savedToken));
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
