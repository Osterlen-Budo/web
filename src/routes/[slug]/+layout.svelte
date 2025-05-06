<script lang="ts">
	import { formatDate } from '$lib/utils';
	import type { LayoutProps } from './$types';

	let { /*children ,*/ data }: LayoutProps = $props();
</script>

<article
	class="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert col-span-2 mx-auto w-full max-w-2xl md:col-span-4"
>
	<div
		class=" flex flex-col items-center justify-center text-center sm:col-span-2 md:col-span-4"
	></div>

	<div
		class="prose mx-1 bg-box p-2 prose-headings:mb-1 prose-h1:text-red-700 prose-strong:text-red-700 prose-thead:bg-red-700 prose-th:px-4 prose-th:text-left prose-th:text-white prose-td:px-4 sm:col-span-2 sm:max-w-none sm:justify-center md:col-span-1 md:col-start-2 md:mx-3 md:p-8"
	>
		<p class="text-sm font-thin"><a href="/">Hem</a> > {data.meta.title}</p>
		<p class="text-sm font-thin">Uppdaterad {formatDate(data.meta.date)}</p>
		<h1>{data.meta.title}</h1>
		<data.content />
	</div>
</article>
