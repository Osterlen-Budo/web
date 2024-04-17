import { json } from '@sveltejs/kit';

import type { Page } from '$lib/types';

async function getNewsItems() {
	let newsItems: Page[] = [];

	const paths = import.meta.glob('/src/routes/nyheter/**/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Item, 'slug'>;
			const newsItem = { ...metadata, slug } satisfies NewsItem;

			console.log('FILE', file);

			newsItem.published && newsItems.push(newsItem);
		}
	}

	newsItems = newsItems.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return newsItems;
}

export async function GET() {
	const newsItems = await getNewsItems();
	return json(newsItems);
}
