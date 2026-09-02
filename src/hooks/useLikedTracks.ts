import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

interface Track {
	id: string;
	name: string;
	artists: { name: string }[];
	album: { images: { url: string }[]; name: string };
	duration_ms: number;
}

interface LikedItem {
	track: Track;
}

interface LikedResponse {
	items?: LikedItem[];
}

export const useLikedTracks = () => {
	const token = useSelector((state: RootState) => state.track.token);
	const [tracks, setTracks] = useState<Track[]>([]);

	useEffect(() => {
		if (!token) return;
		fetch('https://api.spotify.com/v1/me/tracks?limit=10', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then(r => r.json() as Promise<LikedResponse>)
			.then(d => setTracks(d.items?.map(item => item.track) || []))
			.catch(() => setTracks([]));
	}, [token]);

	return tracks;
};
