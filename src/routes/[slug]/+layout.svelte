<script>
	/**
	 * @type {string}
	 */
	export let title;
	/**
	 * @type {string}
	 */
	export let date;
	/**
	 * @type {string}
	 */
	export let image;
	import { formatDate } from '$lib/utils';
	import { P } from 'flowbite-svelte';
</script>

<article
	class="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert col-span-2 mx-auto w-full max-w-2xl md:col-span-4"
>
	<img class="bg-primary-50 mb-5 max-h-96 w-full rounded object-contain" src={image} alt="" />
	<p class="font-thin">{formatDate(date)}</p>
	<p class="mb-2 text-2xl md:text-3xl">{title}</p>
	<slot />
</article>
