import type { Page } from '$lib/types';

export async function load({ fetch }) {
	const response = await fetch('api/news');

	const newsItems: Page[] = await response.json();
	return { newsItems };
}
