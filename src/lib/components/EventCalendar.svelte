<script lang="ts">
	import kalendariumData from '../../pages/kalendarium.json';
	import { MapPin, Clock, Users, Search, Calendar, Trophy, Sparkles, CheckCircle2 } from 'lucide-svelte';

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
	let statusFilter = $state<'all' | 'upcoming' | 'past' | 'competition'>('all');

	const monthsMap: Record<string, number> = {
		jan: 0, januari: 0,
		feb: 1, februari: 1,
		mar: 2, mars: 2,
		apr: 3, april: 3,
		maj: 4,
		jun: 5, juni: 5,
		jul: 6, juli: 6,
		aug: 7, augusti: 7,
		sep: 8, september: 8,
		okt: 9, oktober: 9,
		nov: 10, november: 10,
		dec: 11, december: 11
	};

	function parseEventDate(dateStr: string): Date | null {
		if (!dateStr) return null;
		const clean = dateStr.trim().toLowerCase();

		// Check ISO YYYY-MM-DD
		if (/^\d{4}-\d{2}-\d{2}/.test(clean)) {
			const d = new Date(clean);
			d.setHours(23, 59, 59, 999);
			return d;
		}

		// Check "24-30 Aug", "24–30 Aug", "17 Aug", "3 Okt" etc.
		const parts = clean.split(/[\s,]+/);
		let day: number | null = null;
		let month: number | null = null;
		let year = new Date().getFullYear();

		for (const part of parts) {
			// Range e.g. 24-30 or 24–30
			if (part.includes('-') || part.includes('–')) {
				const rangeDays = part.split(/[-–]/).map((n) => parseInt(n, 10)).filter((n) => !isNaN(n));
				if (rangeDays.length > 0) {
					day = rangeDays[rangeDays.length - 1]; // pick end of range
				}
			} else if (/^\d{1,2}$/.test(part)) {
				day = parseInt(part, 10);
			} else if (/^\d{4}$/.test(part)) {
				year = parseInt(part, 10);
			} else {
				// check month
				for (const [mName, mIdx] of Object.entries(monthsMap)) {
					if (part.startsWith(mName)) {
						month = mIdx;
						break;
					}
				}
			}
		}

		if (day !== null && month !== null) {
			// If month is Jan/Feb/Mar but current month is Autumn (Aug-Dec), it is next year
			const currentMonth = new Date().getMonth();
			if (month < 5 && currentMonth >= 7 && year === new Date().getFullYear()) {
				year += 1;
			}
			const result = new Date(year, month, day, 23, 59, 59, 999);
			return result;
		}

		return null;
	}

	function isEventPast(dateStr: string): boolean {
		const parsed = parseEventDate(dateStr);
		if (!parsed) return false;
		const today = new Date();
		return parsed < today;
	}

	function isCompetition(title: string) {
		const t = title.toLowerCase();
		return t.includes('tävling') || t.includes('open') || t.includes('serien') || t.includes('cup') || t.includes('mästerskap');
	}

	function isSpecialEvent(title: string) {
		const t = title.toLowerCase();
		return t.includes('gradering') || t.includes('avslutning') || t.includes('start') || t.includes('friend') || t.includes('tjej');
	}

	const filteredEvents = $derived(
		data.events.map((event) => ({
			...event,
			isPast: isEventPast(event.date),
			isComp: isCompetition(event.title),
			isSpecial: isSpecialEvent(event.title)
		})).filter((item) => {
			// Status Filter
			if (statusFilter === 'upcoming' && item.isPast) return false;
			if (statusFilter === 'past' && !item.isPast) return false;
			if (statusFilter === 'competition' && !item.isComp) return false;

			// Search query
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
</script>

<div class="my-6 not-prose">
	<!-- Header & Search Toolbar -->
	<div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-card border border-border/80 p-5 mb-6 shadow-xs">
		<div>
			<span class="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">Terminsöversikt</span>
			<h2 class="text-xl font-bold text-foreground mt-0.5">{data.title}</h2>
			{#if data.description}
				<p class="text-xs text-foreground/70 mt-1">{data.description}</p>
			{/if}
		</div>

		<!-- Search & Filter Controls -->
		<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
			<!-- Quick filter pills -->
			<div class="flex items-center gap-1">
				<button
					type="button"
					onclick={() => (statusFilter = 'all')}
					class="px-2.5 py-1.5 text-xs font-semibold rounded-none border transition-colors cursor-pointer {statusFilter === 'all'
						? 'bg-primary text-primary-foreground border-primary'
						: 'bg-background text-foreground/70 border-border hover:border-foreground/40'}"
				>
					Alla
				</button>
				<button
					type="button"
					onclick={() => (statusFilter = 'upcoming')}
					class="px-2.5 py-1.5 text-xs font-semibold rounded-none border transition-colors cursor-pointer {statusFilter === 'upcoming'
						? 'bg-primary text-primary-foreground border-primary'
						: 'bg-background text-foreground/70 border-border hover:border-foreground/40'}"
				>
					Kommande
				</button>
				<button
					type="button"
					onclick={() => (statusFilter = 'past')}
					class="px-2.5 py-1.5 text-xs font-semibold rounded-none border transition-colors cursor-pointer {statusFilter === 'past'
						? 'bg-primary text-primary-foreground border-primary'
						: 'bg-background text-foreground/70 border-border hover:border-foreground/40'}"
				>
					Passerade
				</button>
			</div>

			<!-- Search Input -->
			<div class="relative min-w-[180px]">
				<Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/40" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Sök händelse..."
					class="w-full pl-9 pr-3 py-1.5 text-xs bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
				/>
			</div>
		</div>
	</div>

	<!-- Events List -->
	{#if filteredEvents.length === 0}
		<div class="text-center py-12 border border-dashed border-border bg-card/50">
			<Calendar class="h-8 w-8 text-foreground/30 mx-auto mb-2" />
			<p class="text-sm font-medium text-foreground/70">Inga händelser matchade ditt val.</p>
			<button
				type="button"
				onclick={() => { searchQuery = ''; statusFilter = 'all'; }}
				class="mt-2 text-xs font-semibold text-primary underline cursor-pointer"
			>
				Återställ filter
			</button>
		</div>
	{:else}
		<div class="space-y-3">
			{#each filteredEvents as event}
				<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-5 bg-card border transition-all duration-200 shadow-xs group {event.isPast
					? 'border-border/60 bg-muted/20 opacity-80 hover:opacity-100'
					: 'border-border/80 hover:border-primary/50'}">
					
					<!-- Left: Date block + Info -->
					<div class="flex items-start sm:items-center gap-4 flex-1">
						<!-- Date Badge -->
						<div class="shrink-0 w-20 sm:w-24 px-2.5 py-2 text-center border transition-colors duration-200 {event.isPast
							? 'bg-muted/80 border-border text-foreground/50'
							: 'bg-primary/10 border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground'}">
							<span class="block text-xs md:text-sm font-black tracking-tight">{event.date}</span>
						</div>

						<!-- Title and Badges -->
						<div class="flex-1">
							<div class="flex flex-wrap items-center gap-2 mb-1">
								<h3 class="text-base font-bold text-foreground transition-colors {event.isPast ? 'text-foreground/70' : 'group-hover:text-primary'}">
									{event.title}
								</h3>

								<!-- Status Badges -->
								{#if event.isPast}
									<span class="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-foreground/10 text-foreground/60 border border-foreground/10">
										<CheckCircle2 class="h-2.5 w-2.5 text-foreground/40" />
										Passerat datum
									</span>
								{:else if event.isComp}
									<span class="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
										<Trophy class="h-2.5 w-2.5" />
										Tävling
									</span>
								{:else if event.isSpecial}
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
