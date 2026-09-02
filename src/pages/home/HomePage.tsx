import type { FC } from 'react';
import { useSavedAlbums } from '@/hooks/useSavedAlbums';
import { useLikedTracks } from '@/hooks/useLikedTracks';
import styles from './HomePage.module.css';

const formatDuration = (ms: number) => {
	const m = Math.floor(ms / 60000);
	const s = Math.floor((ms % 60000) / 1000);
	return `${m}:${s.toString().padStart(2, '0')}`;
};

export const HomePage: FC = () => {
	const albums = useSavedAlbums();
	const tracks = useLikedTracks();

	return (
		<div className={styles.page}>
			<section className={styles.section}>
				<h2 className={styles.title}>Любимые треки</h2>
				{tracks.length === 0 ? (
					<p className={styles.empty}>Нет сохранённых треков</p>
				) : (
					<div className={styles.trackList}>
						{tracks.map((t, i) => (
							<div key={t.id} className={styles.trackRow}>
								<span className={styles.trackNum}>{i + 1}</span>
								<img src={t.album.images[0]?.url} alt="" className={styles.trackImg} />
								<div className={styles.trackInfo}>
									<p className={styles.trackName}>{t.name}</p>
									<p className={styles.trackArtist}>{t.artists.map(a => a.name).join(', ')}</p>
								</div>
								<span className={styles.trackDuration}>{formatDuration(t.duration_ms)}</span>
							</div>
						))}
					</div>
				)}
			</section>

			<section className={styles.section}>
				<h2 className={styles.title}>Сохранённые альбомы</h2>
				{albums.length === 0 ? (
					<p className={styles.empty}>Нет сохранённых альбомов</p>
				) : (
					<div className={styles.grid}>
						{albums.map(a => (
							<div key={a.id} className={styles.card}>
								<img src={a.images[0]?.url} alt={a.name} className={styles.cover} />
								<p className={styles.name}>{a.name}</p>
								<p className={styles.artist}>{a.artists.map(ar => ar.name).join(', ')}</p>
							</div>
						))}
					</div>
				)}
			</section>
		</div>
	);
};
