import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

interface Playlist {
	id: string;
	name: string;
}

// Загружает плейлисты текущего пользователя из Spotify API
export const useUserPlaylists = () => {
	const token = useSelector((state: RootState) => state.track.token);
	const [playlists, setPlaylists] = useState<Playlist[]>([]);

	useEffect(() => {
		if (!token) return;

		fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then(res => res.json())
			.then(data => setPlaylists(data.items || []))
			.catch(() => setPlaylists([]));
	}, [token]);

	return { playlists };
};
