import { useState, type FC } from 'react';
import { PanelLeftClose, PanelLeftOpen, Plus } from 'lucide-react';
import { useUserPlaylists } from '@/hooks/useUserPlaylists';
import styles from './Sidebar.module.css';

export const Sidebar: FC = () => {
	const [isOpen, setIsOpen] = useState(true);
	const { playlists } = useUserPlaylists();

	const toggle = () => setIsOpen(prev => !prev);

	return (
		<aside className={`${styles.sidebar} ${isOpen ? '' : styles.collapsed}`}>
			<div className={styles.libHeader}>
				<button className={styles.libTitleBtn} onClick={toggle} title={isOpen ? 'Закрыть' : 'Открыть'}>
					{isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
					<span className={styles.libText}>Моя медиатека</span>
				</button>
				{isOpen && (
					<button className={styles.iconBtn} onClick={() => {}} title="Создать плейлист">
						<Plus size={16} />
					</button>
				)}
			</div>

			{isOpen && (
				<ul className={styles.playlistList}>
					{playlists.map(p => (
						<li key={p.id} className={styles.playlistItem}>
							{p.name}
						</li>
					))}
				</ul>
			)}
		</aside>
	);
};
