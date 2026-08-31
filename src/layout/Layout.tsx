import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/shared/ui/Header';
import styles from './Layout.module.css';

export const Layout: FC = () => (
	<div className={styles.wrapper}>
		<Header />
		<main className={styles.content}>
			<Outlet />
		</main>
	</div>
);
