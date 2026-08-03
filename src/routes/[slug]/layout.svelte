<script lang="ts">
	let { title, date, image, children } = $props();
	import { formatDate } from '$lib/utils';
</script>

<article class="max-w-4xl mx-auto px-6 pt-8 pb-16 min-h-screen">
	{#if image}
		<img class="object-cover h-64 md:h-96 w-full mb-8 rounded-lg shadow-sm" src={image} alt="" />
	{/if}
	
	{#if date}
		<p class="text-foreground/50 font-medium mb-4">{formatDate(date)}</p>
	{/if}

	<div class="prose prose-slate prose-lg max-w-none prose-h1:text-primary prose-a:text-primary hover:prose-a:text-foreground prose-th:text-left transition-colors">
		{@render children()}
	</div>
</article>
