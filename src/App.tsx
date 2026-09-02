import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { Header } from '@/shared/ui/Header';
import { MainLayout } from '@/layout/MainLayout';
import { LoginPage } from '@/pages/login';
import { HomePage } from '@/pages/home';
import { SearchPage } from '@/pages/search';

function App() {
	const token = useSelector((state: RootState) => state.track.token);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/login" element={<LoginPage />} />

				<Route element={<MainLayout />}>
					<Route path="/home" element={token ? <HomePage /> : <Navigate to="/login" />} />
					<Route path="*" element={<Navigate to="/login" />} />
					<Route path="/search" element={token ? <SearchPage /> : <Navigate to="/login" />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
