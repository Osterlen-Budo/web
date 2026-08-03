<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import logo from '$lib/assets/logo_no_text.png';
	import { ArrowRight, Bell } from 'lucide-svelte';

	let { data } = $props();
	const homepage = $derived(data.homepage);
</script>

<!-- Hero / Welcome Area -->
<div class="flex flex-col items-center justify-center text-center mt-12 mb-20 animate-fade-in-up">
	<img src={logo} alt="Österlen Budo Logo" class="h-28 md:h-36 mb-10 opacity-90 transition-transform hover:scale-105 duration-700" />
	<h1 class="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-8">
		{homepage.welcomeTitle}
	</h1>
	<div class="max-w-2xl mx-auto">
		<p class="text-lg md:text-xl text-foreground/70 font-light leading-relaxed">
			{homepage.welcomeText}
		</p>
	</div>
</div>

<!-- Main Content Area -->
<div class="flex flex-col gap-12">
	<!-- Announcement Alert -->
	{#if homepage.announcementActive}
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background border-l-4 border-l-primary border-y border-r border-border p-6 shadow-sm transition-all duration-300">
			<div class="flex items-start gap-4">
				<div class="text-primary p-1 shrink-0 mt-0.5">
					<Bell class="h-6 w-6" />
				</div>
				<div>
					<h4 class="font-bold text-foreground tracking-wide uppercase text-sm mb-1">Viktigt meddelande</h4>
					<p class="text-sm font-medium text-foreground/80 leading-relaxed">{homepage.announcementText}</p>
				</div>
			</div>
			{#if homepage.announcementLink}
				<Button href={homepage.announcementLink} variant="outline" class="shrink-0 rounded-none border-border text-foreground hover:bg-muted hover:text-primary font-semibold px-6">
					Läs mer
				</Button>
			{/if}
		</div>
	{/if}

	<!-- Quick Links Section -->
	<div>
		<div class="flex items-center gap-4 mb-8">
			<div class="h-px bg-border flex-1"></div>
			<h3 class="text-sm font-bold text-foreground/50 uppercase tracking-[0.2em] px-4">Information</h3>
			<div class="h-px bg-border flex-1"></div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border p-px">
			{#each homepage.quickLinks as link}
				<a href={link.url} class="group flex flex-col p-8 bg-background hover:bg-muted/50 transition-all duration-500 cursor-pointer">
					<div class="flex justify-between items-start mb-6">
						<h4 class="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{link.title}</h4>
						<div class="text-border group-hover:text-primary transition-colors duration-500">
							<ArrowRight class="h-5 w-5" />
						</div>
					</div>
					<p class="text-foreground/60 font-light text-sm leading-relaxed mt-auto">
						{link.description}
					</p>
				</a>
			{/each}
		</div>
	</div>

	<!-- Facebook News Section -->
	<div>
		<div class="flex items-center gap-4 mb-8">
			<div class="h-px bg-border flex-1"></div>
			<h3 class="text-sm font-bold text-foreground/50 uppercase tracking-[0.2em] px-4">Senaste Nytt</h3>
			<div class="h-px bg-border flex-1"></div>
		</div>

		<div class="bg-background border border-border p-8 md:p-10 text-center flex flex-col items-center justify-center transition-colors hover:border-primary/50 duration-500">
			<div class="text-foreground/40 mb-6">
				<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
			</div>
			<h4 class="text-2xl font-bold text-foreground mb-4">Följ oss på Facebook</h4>
			<p class="text-foreground/70 font-light leading-relaxed max-w-lg mb-8">
				Vi uppdaterar regelbundet vår Facebook-sida med de senaste nyheterna, bilder från träningar och viktig information inför kommande evenemang.
			</p>
			<Button href="https://www.facebook.com/profile.php?id=100083236780786" target="_blank" rel="noopener noreferrer" class="rounded-none bg-primary text-primary-foreground hover:bg-foreground transition-colors px-8 py-6 font-bold tracking-wide uppercase text-sm flex items-center gap-2">
				Till vår Facebook-sida
				<ArrowRight class="h-4 w-4" />
			</Button>
		</div>
	</div>
</div>
