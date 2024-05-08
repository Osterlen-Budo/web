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


</script>

<style>
	p{
		color: #F00;
	}
</style>
<div class="sm:grid-cols-2 md:col-start-2 mb-10 mx-10 ">
	<Breadcrumb  aria-label="Default breadcrumb example">
		<BreadcrumbItem href="/" home>Hem</BreadcrumbItem>
		<BreadcrumbItem>{title}</BreadcrumbItem>
	  </Breadcrumb>

	<div class='pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 prose prose-h1:mb-1'>
		<article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
			<img class="object-contain max-h-96 w-full mb-5  rounded" src={image} alt=""  />
			<p class="font-thin">{formatDate(date)}</p>
			<p class="text-2xl md:text-3xl mb-2">{title}</p>
			<slot />
		</article>
	</div>

		

</div>