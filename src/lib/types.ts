export type Categories = 'sveltekit' | 'svelte';

export type Page = {
	title: string;
	slug: string;
	date: string;
	time?: string;
	image?: string;
	published: boolean;
};

export type Judoka = {
	name: string;
};
