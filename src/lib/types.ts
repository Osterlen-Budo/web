export type Categories = 'sveltekit' | 'svelte';

export type NewsItem = {
	title: string;
	slug: string;
	description: string;
	date: string;
	image: string;
	categories: Categories[];
	published: boolean;
};
