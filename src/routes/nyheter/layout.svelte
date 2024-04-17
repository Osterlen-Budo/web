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


</script>

<style>
	p{
		color: #F00;
	}
</style>
<div class="sm:grid-cols-2 md:col-start-2 mb-10 mx-10 ">
	<Breadcrumb  aria-label="Default breadcrumb example">
		<BreadcrumbItem href="/" home>Hem</BreadcrumbItem>
		<BreadcrumbItem href="/nytheter">Nyheter</BreadcrumbItem>
		<BreadcrumbItem>{title}</BreadcrumbItem>
	  </Breadcrumb>
	<Section classSection='pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900'>
	
		<article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
			<img class="object-contain max-h-96 w-full mb-5 bg-primary-50 rounded" src={image} alt=""  />
			<P class="font-thin">{formatDate(date)}</P>
			<P class="text-2xl md:text-3xl mb-2">{title}</P>

			<slot />
		</article>
	</Section>

		

</div>