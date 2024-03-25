import type { NewsItem } from '$lib/types';

export async function load({ fetch }) {
	const response = await fetch('api/news');
	const newsItems: NewsItem[] = await response.json();
	return { newsItems };
}
