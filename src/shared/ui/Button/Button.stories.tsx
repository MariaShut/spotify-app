import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
	title: 'Shared/UI/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: 'Войти через Spotify',
		onClick: () => console.log('clicked'),
	},
};

export const ShortLabel: Story = {
	args: {
		children: 'OK',
		onClick: () => console.log('clicked'),
	},
};

export const LongLabel: Story = {
	args: {
		children: 'Создать новый плейлист',
		onClick: () => console.log('clicked'),
	},
};
