import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { Layout } from '@/layout';
import { LoginPage } from '@/pages/login';
import { HomePage } from '@/pages/home';

function App() {
	const token = useSelector((state: RootState) => state.track.token);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/home" element={token ? <HomePage /> : <Navigate to="/login" />} />
					<Route path="*" element={<Navigate to="/login" />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
