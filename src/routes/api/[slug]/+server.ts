import { json } from '@sveltejs/kit';

import type { Page } from '$lib/types';

function loadFiles(slug: string) {
	const paths = import.meta.glob(`/src/routes/**/*.md`, { eager: true });
	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Page, 'slug'>;
			const page = { ...metadata, slug } satisfies Page;

			console.log('FILE', file);

			page.published && pages.push(page);
		}
	}
}

function loadPage(slug: string) {
	// const page = import.meta.glob(`/src/routes/**/*/${slug}.md`, { eager: true });

	if (!page) {
		throw new Error(`Found no page with name ${slug}`);
	} else if (Array.isArray(page)) {
		throw new Error(`Found multiple pages named ${slug}`);
	}

	if (typeof page === 'object' && page.metadata) {
		return page;
	}
}

async function getPage(title: string) {
	const page = await loadPage(title);
	return page;
}

// async function getCalendarEvents() {
// 	let events: CalendarEvent;
// 	const paths = loadPaths('kalender');
// }

// async function getNewsItems() {
// 	let newsItems: NewsItem[] = [];

// 	const paths = loadPaths('nyheter');

// 	for (const path in paths) {
// 		const file = paths[path];
// 		const slug = path.split('/').at(-1)?.replace('.md', '');

// 		if (file && typeof file === 'object' && 'metadata' in file && slug) {
// 			const metadata = file.metadata as Omit<NewsItem, 'slug'>;
// 			const newsItem = { ...metadata, slug } satisfies NewsItem;

// 			console.log('FILE', file);

// 			newsItem.published && newsItems.push(newsItem);
// 		}
// 	}

// 	newsItems = newsItems.sort(
// 		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
// 	);

// 	return newsItems;
// }

export async function GET({ params }) {
	// const path = url.searchParams.get('path');

	switch (params.slug) {
		case 'borjatrana':
			console.log('BORJATRANA: ', params.slug);
			return json(await getPage(params.slug));
			break;

		default:
			break;
	}

	//const newsItems = await getNewsItems();
	return json({});
}
