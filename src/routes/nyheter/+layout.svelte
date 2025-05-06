<script>
	//import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

	import { formatDate } from '$lib/utils';
	/**
	 * @typedef {Object} Props
	 * @property {string} title
	 * @property {string} date
	 * @property {string} image
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { title, date, image, children } = $props();
</script>

<div class="mx-10 mb-10 sm:grid-cols-2 md:col-start-2">
	<div aria-label="Default breadcrumb example">
		<a href="/">Hem</a>
		<div>{title}</div>
	</div>

	<div class="prose bg-white pb-16 pt-8 prose-h1:mb-1 dark:bg-gray-900 lg:pb-24 lg:pt-16">
		<article
			class="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl"
		>
			<img class="mb-5 max-h-96 w-full rounded object-contain" src={image} alt="" />
			<p class="font-thin">{formatDate(date)}</p>
			<p class="mb-2 text-2xl md:text-3xl">{title}</p>
			{@render children?.()}
		</article>
	</div>
</div>

<style>
	p {
		color: #f00;
	}
</style>
