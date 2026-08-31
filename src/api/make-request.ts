import { getAccessToken } from './spotify-auth';

export const makeRequest = async <T = unknown>(url: string, options?: RequestInit): Promise<T> => {
	const token = getAccessToken();

	const response = await fetch(url, {
		...options,
		headers: {
			Authorization: `Bearer ${token ?? ''}`,
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});

	if (!response.ok) {
		throw new Error(`Ошибка ${response.status}`);
	}

	return response.json() as Promise<T>;
};
