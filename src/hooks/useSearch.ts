import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

interface SearchResult {
	tracks: { id: string; name: string; artists: { name: string }[]; album: { images: { url: string }[] } }[];
	albums: { id: string; name: string; images: { url: string }[]; artists: { name: string }[] }[];
	artists: { id: string; name: string; images: { url: string }[] }[];
}

export const useSearch = (query: string) => {
	const token = useSelector((state: RootState) => state.track.token);
	const [results, setResults] = useState<SearchResult>({ tracks: [], albums: [], artists: [] });
	const [loading, setLoading] = useState(false);
	const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		if (!token || !query.trim()) {
			setResults({ tracks: [], albums: [], artists: [] });
			setLoading(false);
			return;
		}

		const controller = new AbortController();
		abortControllerRef.current = controller;
		setLoading(true);

		const encodedQuery = encodeURIComponent(query.trim());
		const headers = { Authorization: `Bearer ${token}` };

		// search track
		const fetchTracks = fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=10`, { headers, signal: controller.signal })
			.then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
			.then(data => data.tracks?.items || [])
			.catch(() => []);

		// search album
		const fetchAlbums = fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=album&limit=10`, { headers, signal: controller.signal })
			.then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
			.then(data => data.albums?.items || [])
			.catch(() => []);

		// search artist
		const fetchArtists = fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=artist&limit=10`, { headers, signal: controller.signal })
			.then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
			.then(data => data.artists?.items || [])
			.catch(() => []);

		Promise.all([fetchTracks, fetchAlbums, fetchArtists])
			.then(([tracks, albums, artists]) => {
				setResults({ tracks, albums, artists });
			})
			.catch(error => {
				if (error.name === 'AbortError') return;
				console.error('Search error:', error.message);
				setResults({ tracks: [], albums: [], artists: [] });
			})
			.finally(() => {
				setLoading(false);
				if (abortControllerRef.current === controller) {
					abortControllerRef.current = null;
				}
			});

		return () => {
			controller.abort();
		};
	}, [token, query]);

	return { results, loading };
};
