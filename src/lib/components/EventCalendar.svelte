<script lang="ts">
	import kalendariumData from '../../pages/kalendarium.json';
	import { MapPin, Clock, Users, Search, Calendar, Trophy, Sparkles } from 'lucide-svelte';

	type EventItem = {
		date: string;
		time?: string;
		title: string;
		location?: string;
		forWhom?: string;
	};

	const data = $derived({
		title: kalendariumData?.title || 'Kalendarium',
		description: kalendariumData?.description || 'Händelser och tävlingar under terminen.',
		events: (kalendariumData?.events || []) as EventItem[]
	});

	let searchQuery = $state('');

	const filteredEvents = $derived(
		data.events.filter((item) => {
			if (!searchQuery.trim()) return true;
			const q = searchQuery.toLowerCase();
			return (
				item.title.toLowerCase().includes(q) ||
				(item.location && item.location.toLowerCase().includes(q)) ||
				(item.forWhom && item.forWhom.toLowerCase().includes(q)) ||
				item.date.toLowerCase().includes(q)
			);
		})
	);

	function isCompetition(title: string) {
		const t = title.toLowerCase();
		return t.includes('tävling') || t.includes('open') || t.includes('serien') || t.includes('cup') || t.includes('mästerskap');
	}

	function isSpecialEvent(title: string) {
		const t = title.toLowerCase();
		return t.includes('gradering') || t.includes('avslutning') || t.includes('start') || t.includes('friend') || t.includes('tjej');
	}
</script>

<div class="my-6 not-prose">
	<!-- Header & Search Toolbar -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/80 p-5 mb-6 shadow-xs">
		<div>
			<span class="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">Terminsöversikt</span>
			<h2 class="text-xl font-bold text-foreground mt-0.5">{data.title}</h2>
			{#if data.description}
				<p class="text-xs text-foreground/70 mt-1">{data.description}</p>
			{/if}
		</div>

		<div class="relative min-w-[220px]">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/40" />
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Sök händelse, plats..."
				class="w-full pl-9 pr-3 py-2 text-xs bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
			/>
		</div>
	</div>

	<!-- Events List -->
	{#if filteredEvents.length === 0}
		<div class="text-center py-12 border border-dashed border-border bg-card/50">
			<Calendar class="h-8 w-8 text-foreground/30 mx-auto mb-2" />
			<p class="text-sm font-medium text-foreground/70">Inga händelser matchade din sökning.</p>
			<button
				type="button"
				onclick={() => (searchQuery = '')}
				class="mt-2 text-xs font-semibold text-primary underline"
			>
				Rensa sökning
			</button>
		</div>
	{:else}
		<div class="space-y-3">
			{#each filteredEvents as event, i}
				{@const comp = isCompetition(event.title)}
				{@const special = isSpecialEvent(event.title)}

				<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-5 bg-card border border-border/80 hover:border-primary/50 transition-all duration-200 shadow-xs group">
					
					<!-- Left: Date block + Info -->
					<div class="flex items-start sm:items-center gap-4 flex-1">
						<!-- Date Badge -->
						<div class="shrink-0 w-20 sm:w-24 px-2.5 py-2 text-center bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
							<span class="block text-xs md:text-sm font-black tracking-tight">{event.date}</span>
						</div>

						<!-- Title and Badges -->
						<div class="flex-1">
							<div class="flex flex-wrap items-center gap-2 mb-1">
								<h3 class="text-base font-bold text-foreground group-hover:text-primary transition-colors">
									{event.title}
								</h3>

								{#if comp}
									<span class="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
										<Trophy class="h-2.5 w-2.5" />
										Tävling
									</span>
								{:else if special}
									<span class="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
										<Sparkles class="h-2.5 w-2.5" />
										Klubbhändelse
									</span>
								{/if}
							</div>

							<!-- Details row -->
							<div class="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-foreground/70">
								{#if event.time}
									<div class="flex items-center gap-1.5 font-medium">
										<Clock class="h-3.5 w-3.5 text-foreground/40" />
										<span>{event.time}</span>
									</div>
								{/if}

								{#if event.location}
									<div class="flex items-center gap-1.5 font-medium">
										<MapPin class="h-3.5 w-3.5 text-foreground/40" />
										<span>{event.location}</span>
									</div>
								{/if}

								{#if event.forWhom}
									<div class="flex items-center gap-1.5 text-foreground/60">
										<Users class="h-3.5 w-3.5 text-foreground/40" />
										<span>{event.forWhom}</span>
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Legend / Note -->
	<div class="mt-6 p-4 bg-muted/30 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-foreground/70">
		<span>Tider och platser kan uppdateras löpande under terminen.</span>
		<a href="/kontakt" class="text-primary font-semibold hover:underline">Frågor om evenemang? Kontakta oss →</a>
	</div>
</div>
