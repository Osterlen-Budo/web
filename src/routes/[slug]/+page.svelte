<script lang="ts">
	let { data } = $props();
	const Content = $derived(data.content);
</script>

<svelte:head>
	<title>{data.meta?.title ? `${data.meta.title} | Österlen Budo` : 'Österlen Budo'}</title>
	{#if data.meta?.description}
		<meta name="description" content={data.meta.description} />
		<meta property="og:description" content={data.meta.description} />
	{/if}
	<meta property="og:title" content="{data.meta?.title || 'Österlen Budo'} | Österlen Budo" />
</svelte:head>

<div class="max-w-4xl mx-auto px-6 pt-4 pb-16 min-h-screen">
	<article class="prose prose-lg prose-slate prose-h1:mt-0 prose-h1:text-primary prose-a:text-primary prose-a:font-bold hover:prose-a:text-foreground prose-img:rounded-sm prose-th:text-left max-w-none">
		<h1>{data.meta.title}</h1>
		<Content />
	</article>
</div>

