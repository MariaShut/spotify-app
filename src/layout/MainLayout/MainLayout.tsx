import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import styles from './MainLayout.module.css';

export const MainLayout: FC = () => (
	<div className={styles.wrapper}>
		<div className={styles.body}>
			<Sidebar />
			<main className={styles.content}>
				<Outlet />
			</main>
		</div>
	</div>
);
