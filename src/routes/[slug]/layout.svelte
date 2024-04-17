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
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

	import { formatDate } from '$lib/utils'
	import { P } from 'flowbite-svelte';
	import { Section } from 'flowbite-svelte-blocks'
	import { lastIndexOf } from 'lodash';


</script>


<article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
    <img class="object-contain max-h-96 w-full mb-5 bg-primary-50 rounded" src={image} alt=""  />
    <P class="font-thin">{formatDate(date)}</P>
    <P class="text-2xl md:text-3xl mb-2">{title}</P>
    <slot />
</article>
<style lang="postcss">
    h2 {
        font-size: 20px;
        font-weight: bold;
    }
    </style>
