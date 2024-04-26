<script lang="ts">
	export let data
</script>

<style>

</style>

<div class="text-center mt-28 flex items-center justify-center flex-col sm:col-span-2 md:col-span-4">
</div>

<div class="p-1 mx-3   sm:col-span-2 md:col-span-1 sm:justify-center sm:max-w-none md:col-start-2 prose prose-headings:mb-1 prose-h1:text-red-700 prose-td:px-4 prose-th:px-4 prose-th:text-white prose-th:text-left prose-thead:bg-red-700 prose-strong:text-red-700">
    <h1>{data.meta.title}</h1>
    <svelte:component this={data.content} />
</div>

