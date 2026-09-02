import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

export const useUserProfile = () => {
	const token = useSelector((state: RootState) => state.track.token);
	const [name, setName] = useState('Guest');

	useEffect(() => {
		if (!token) return;
		fetch('https://api.spotify.com/v1/me', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then(r => r.json())
			.then(d => setName(d.display_name || 'Guest'))
			.catch(() => setName('Guest'));
	}, [token]);

	return name;
};
