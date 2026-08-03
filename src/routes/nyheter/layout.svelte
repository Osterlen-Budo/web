<script lang="ts">
	let { title, date, image, children } = $props();
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { formatDate } from '$lib/utils';
</script>

<div class="max-w-4xl mx-auto px-6 pt-8 pb-16 min-h-screen">
	<div class="mb-10">
		<Breadcrumb aria-label="Default breadcrumb example">
			<BreadcrumbItem href="/" home>Hem</BreadcrumbItem>
			<BreadcrumbItem>{title}</BreadcrumbItem>
		</Breadcrumb>
	</div>

	<article class="w-full">
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
</div>