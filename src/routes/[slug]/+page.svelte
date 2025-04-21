<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div
	class="mt-28 flex flex-col items-center justify-center text-center sm:col-span-2 md:col-span-4"
></div>

<div
	class="prose mx-3 p-1 prose-headings:mb-1 prose-h1:text-red-700 prose-strong:text-red-700 prose-thead:bg-red-700 prose-th:px-4 prose-th:text-left prose-th:text-white prose-td:px-4 sm:col-span-2 sm:max-w-none sm:justify-center md:col-span-1 md:col-start-2"
>
	<h1>{data.meta.title}</h1>
	<svelte:component this={data.content} />
</div>

<style>
</style>
