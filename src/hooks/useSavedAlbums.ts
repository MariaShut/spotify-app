import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

interface Album {
	id: string;
	name: string;
	images: { url: string }[];
	artists: { name: string }[];
}

interface SavedItem {
	album: Album;
}

interface SavedResponse {
	items?: SavedItem[];
}

export const useSavedAlbums = () => {
	const token = useSelector((state: RootState) => state.track.token);
	const [albums, setAlbums] = useState<Album[]>([]);

	useEffect(() => {
		if (!token) return;
		fetch('https://api.spotify.com/v1/me/albums?limit=20', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then(r => r.json() as Promise<SavedResponse>)
			.then(d => setAlbums(d.items?.map(item => item.album) || []))
			.catch(() => setAlbums([]));
	}, [token]);

	return albums;
};
