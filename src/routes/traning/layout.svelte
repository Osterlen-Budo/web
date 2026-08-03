<script lang="ts">
	let { children } = $props();
</script>

<div class="max-w-4xl mx-auto px-6 pt-8 pb-16 min-h-screen">
    <article class="prose prose-slate prose-lg max-w-none prose-h1:text-primary prose-a:text-primary hover:prose-a:text-foreground prose-th:text-left transition-colors">
        {@render children()}
    </article>
</div>
