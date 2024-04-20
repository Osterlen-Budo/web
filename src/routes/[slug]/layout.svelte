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
	import { formatDate } from '$lib/utils'
	import { P } from 'flowbite-svelte';


</script>


<article class="mx-auto w-full  max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
    <img class="object-contain max-h-96 w-full mb-5 bg-primary-50 rounded" src={image} alt=""  />
    <p class="font-thin">{formatDate(date)}</p>
    <p class="text-2xl md:text-3xl mb-2">{title}</p>
    <slot />
</article>
