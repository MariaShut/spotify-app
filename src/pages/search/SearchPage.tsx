import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '@/hooks/useSearch';
import styles from './SearchPage.module.css';

type Tab = 'tracks' | 'albums' | 'artists';

export const SearchPage = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('q') || '';
	const { results, loading } = useSearch(query);
	const [activeTab, setActiveTab] = useState<Tab>('tracks');

	if (!query) {
		return (
			<div className={styles.page}>
				<p className={styles.empty}>Введите запрос для поиска</p>
			</div>
		);
	}

	const currentItems = activeTab === 'tracks' ? results.tracks : activeTab === 'albums' ? results.albums : results.artists;

	return (
		<div className={styles.page}>
			<h2 className={styles.title}>Результаты поиска: «{query}»</h2>
			<div className={styles.tabs}>
				<button className={`${styles.tab} ${activeTab === 'tracks' ? styles.active : ''}`} onClick={() => setActiveTab('tracks')}>
					Треки ({results.tracks.length})
				</button>
				<button className={`${styles.tab} ${activeTab === 'albums' ? styles.active : ''}`} onClick={() => setActiveTab('albums')}>
					Альбомы ({results.albums.length})
				</button>
				<button className={`${styles.tab} ${activeTab === 'artists' ? styles.active : ''}`} onClick={() => setActiveTab('artists')}>
					Исполнители ({results.artists.length})
				</button>
			</div>
			{loading && <p className={styles.empty}>Загрузка...</p>}
			{!loading && currentItems.length === 0 && <p className={styles.empty}>Ничего не найдено</p>}
			{!loading && activeTab === 'tracks' && (
				<div className={styles.grid}>
					{results.tracks.map(t => (
						<div key={t.id} className={styles.card}>
							<img src={t.album?.images?.[0]?.url} alt={t.name} className={styles.cover} />
							<p className={styles.name}>{t.name}</p>
							<p className={styles.artist}>{t.artists?.map((a: { name: string }) => a.name).join(', ')}</p>
						</div>
					))}
				</div>
			)}
			{!loading && activeTab === 'albums' && (
				<div className={styles.grid}>
					{results.albums.map(a => (
						<div key={a.id} className={styles.card}>
							<img src={a.images?.[0]?.url} alt={a.name} className={styles.cover} />
							<p className={styles.name}>{a.name}</p>
							<p className={styles.artist}>{a.artists?.map((ar: { name: string }) => ar.name).join(', ')}</p>
						</div>
					))}
				</div>
			)}
			{!loading && activeTab === 'artists' && (
				<div className={styles.grid}>
					{results.artists.map(a => (
						<div key={a.id} className={styles.card}>
							<img src={a.images?.[0]?.url} alt={a.name} className={styles.coverRound} />
							<p className={styles.name}>{a.name}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
