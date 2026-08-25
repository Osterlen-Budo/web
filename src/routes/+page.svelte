<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import logo from '$lib/assets/logo_no_text.png';
	import { ArrowRight, Bell, Shield, Heart, Zap, Sparkles, MapPin, Info } from 'lucide-svelte';

	let { data } = $props();
	const homepage = $derived(data.homepage);
	const termin = $derived(data.termin);

	function formatSwedishDate(dateStr?: string) {
		if (!dateStr) return '';
		try {
			const d = new Date(dateStr);
			return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
		} catch {
			return dateStr || '';
		}
	}

	const isIntakeClosed = $derived.by(() => {
		if (!termin?.intakeEndDate) return false;
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const deadline = new Date(termin.intakeEndDate);
		deadline.setHours(23, 59, 59, 999);
		return today > deadline;
	});
</script>

<!-- Hero / Welcome Area -->
<div class="flex flex-col items-center justify-center text-center mt-6 mb-16 animate-fade-in-up">
	<div class="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20">
		<Sparkles class="h-3.5 w-3.5" />
		Judo för alla åldrar i Sjöbo & Österlen
	</div>

	<img src={logo} alt="Österlen Budo Logo" class="h-28 md:h-36 mb-8 opacity-90 transition-transform hover:scale-105 duration-700" />
	
	<h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6 max-w-3xl leading-[1.1]">
		{homepage.welcomeTitle}
	</h1>
	
	<div class="max-w-2xl mx-auto mb-10">
		<p class="text-lg md:text-xl text-foreground/70 font-light leading-relaxed">
			{homepage.welcomeText}
		</p>
	</div>

	<!-- Primary Action Buttons -->
	<div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
		{#if !isIntakeClosed}
			<Button
				href="/borjatrana"
				class="w-full sm:w-auto rounded-none bg-primary text-primary-foreground hover:bg-foreground transition-all duration-200 px-8 py-6 font-bold tracking-wide uppercase text-sm shadow-md flex items-center justify-center gap-2"
			>
				Börja träna – 3 ggr gratis
				<ArrowRight class="h-4 w-4" />
			</Button>
		{:else}
			<Button
				href="/borjatrana"
				class="w-full sm:w-auto rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-200 px-8 py-6 font-bold tracking-wide uppercase text-sm shadow-md flex items-center justify-center gap-2"
			>
				Börja träna (Info)
				<ArrowRight class="h-4 w-4" />
			</Button>
		{/if}
		<Button
			href="/tider"
			variant="outline"
			class="w-full sm:w-auto rounded-none border-border hover:bg-muted text-foreground px-8 py-6 font-semibold tracking-wide uppercase text-sm"
		>
			Se träningstider
		</Button>
	</div>

	<!-- Closed Intake Notice Banner -->
	{#if isIntakeClosed}
		<div class="mt-8 max-w-xl mx-auto p-4 bg-muted/60 border border-border flex items-start sm:items-center gap-3 text-left shadow-xs">
			<div class="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 text-foreground/70 mt-0.5 sm:mt-0">
				<Info class="h-4 w-4" />
			</div>
			<div>
				<h4 class="text-xs font-bold uppercase tracking-wider text-foreground">Intag stängt för {termin?.name || 'terminen'}</h4>
				<p class="text-xs text-foreground/70 mt-0.5">
					Intaget av nya medlemmar för denna termin stängde den {formatSwedishDate(termin?.intakeEndDate)}. Välkommen åter vid nästa terminsstart!
				</p>
			</div>
		</div>
	{/if}
</div>


<!-- Main Content Area -->
<div class="flex flex-col gap-16">
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

	<!-- Value Proposition: Why Judo? -->
	<div>
		<div class="flex items-center gap-4 mb-8">
			<div class="h-px bg-border flex-1"></div>
			<h3 class="text-sm font-bold text-foreground/50 uppercase tracking-[0.2em] px-4">Varför Judo?</h3>
			<div class="h-px bg-border flex-1"></div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="bg-card border border-border/80 p-6 flex flex-col items-start shadow-sm hover:border-primary/50 transition-colors">
				<div class="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center mb-4">
					<Zap class="h-5 w-5" />
				</div>
				<h4 class="text-lg font-bold text-foreground mb-2">Motorik & Rörelseglädje</h4>
				<p class="text-xs text-foreground/70 leading-relaxed">
					Träna hela kroppen! Judo utvecklar balans, styrka, smidighet och kroppskontroll i en fartfylld och säker miljö.
				</p>
			</div>

			<div class="bg-card border border-border/80 p-6 flex flex-col items-start shadow-sm hover:border-primary/50 transition-colors">
				<div class="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center mb-4">
					<Shield class="h-5 w-5" />
				</div>
				<h4 class="text-lg font-bold text-foreground mb-2">Respekt & Självförtroende</h4>
				<p class="text-xs text-foreground/70 leading-relaxed">
					Judons värdegrund bygger på ömsesidig respekt, hänsyn och disciplin. Genom fallteknik och övning stärks självkänslan.
				</p>
			</div>

			<div class="bg-card border border-border/80 p-6 flex flex-col items-start shadow-sm hover:border-primary/50 transition-colors">
				<div class="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center mb-4">
					<Heart class="h-5 w-5" />
				</div>
				<h4 class="text-lg font-bold text-foreground mb-2">Gemenskap för alla</h4>
				<p class="text-xs text-foreground/70 leading-relaxed">
					Från Stor & Liten (4–6 år) och barn till ungdomar och vuxna motionärer – hos oss finns en plats för alla oavsett ambition.
				</p>
			</div>
		</div>
	</div>

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

	<!-- Location & Dojo Quick Card -->
	<div class="bg-muted/30 border border-border p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
		<div class="flex items-start gap-4">
			<div class="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center shrink-0">
				<MapPin class="h-5 w-5" />
			</div>
			<div>
				<h4 class="text-lg font-bold text-foreground mb-1">Träna i vår dojo på Kvarngatan 1</h4>
				<p class="text-xs text-foreground/70 leading-relaxed">
					Vår dojo finns på Kvarngatan 1 (på innergården, 2:a våningen) i Sjöbo. Välkommen ner under våra träningstider!
				</p>
			</div>
		</div>
		<Button href="/kontakt" variant="outline" class="shrink-0 rounded-none border-border hover:bg-background text-foreground text-xs font-semibold uppercase tracking-wider">
			Hitta hit & kontakt
		</Button>
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

