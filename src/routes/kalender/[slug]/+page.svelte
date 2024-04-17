<script lang="ts">
	export let data
</script>

<div class="text-center mt-28 flex items-center justify-center flex-col sm:col-span-2 md:col-span-4">
</div>

<div class=" md:col-start-2">
    <svelte:component this={data.content} />
</div>