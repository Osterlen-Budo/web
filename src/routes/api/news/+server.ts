import { json } from '@sveltejs/kit';

import type { NewsItem } from '$lib/types';

async function getNewsItems() {
	let newsItems: NewsItem[] = [];
	const items: any[] = [];

	const paths = import.meta.glob('/src/routes/nyheter/**/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<NewsItem, 'slug'>;
			const newsItem = { ...metadata, slug } satisfies NewsItem;
			newsItem.published && newsItems.push(newsItem);

			items.push({ meta: newsItem, content: file.default });
		}
	}

	newsItems = newsItems.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return items;
}

export async function GET() {
	const newsItems = await getNewsItems();
	return json(newsItems);
}
