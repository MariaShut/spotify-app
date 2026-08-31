import type { FC, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
	onClick: () => void;
	children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ onClick, children }) => (
	<button className={styles.button} onClick={onClick}>
		{children}
	</button>
);
