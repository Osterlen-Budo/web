<script lang="ts">
	import terminData from '../../pages/termin.json';
	import schemaData from '../../pages/schema.json';
	import { Calendar, Users, Clock, Shield, Sparkles, LayoutGrid, CalendarDays } from 'lucide-svelte';

	type Session = {
		day: string;
		dayOrder: number;
		time: string;
		group: string;
		age: string;
		category: 'all' | 'small' | 'kids' | 'youth' | 'adults';
		belt: string;
		level: string;
	};

	function formatSwedishDate(dateStr: string) {
		if (!dateStr) return '';
		try {
			const d = new Date(dateStr);
			return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
		} catch {
			return dateStr;
		}
	}

	const terminInfo = $derived({
		name: terminData?.name || 'Höstterminen 2026',
		start: formatSwedishDate(terminData?.startDate),
		end: formatSwedishDate(terminData?.endDate),
		intakeEnd: formatSwedishDate(terminData?.intakeEndDate),
		infoText: terminData?.infoText || ''
	});

	const rawSessions = $derived((schemaData?.sessions || []) as Session[]);

	let activeView = $state<'weekly' | 'age'>('weekly');
	let selectedCategory = $state<'all' | 'small' | 'kids' | 'youth' | 'adults'>('all');

	const categories = [
		{ id: 'all', label: 'Alla grupper' },
		{ id: 'small', label: 'Stor & Liten (4–6 år)' },
		{ id: 'kids', label: 'Barn (7–12 år)' },
		{ id: 'youth', label: 'Ungdomar (13–17 år)' },
		{ id: 'adults', label: 'Vuxna (18+)' }
	] as const;

	const daysOfWeek = [
		{ name: 'Måndag', order: 1 },
		{ name: 'Tisdag', order: 2 },
		{ name: 'Onsdag', order: 3 },
		{ name: 'Torsdag', order: 4 },
		{ name: 'Fredag', order: 5 },
		{ name: 'Lördag', order: 6 },
		{ name: 'Söndag', order: 7 }
	];

	// Group sessions by day for weekly view
	const weeklySchedule = $derived(
		daysOfWeek
			.map((d) => {
				const daySessions = rawSessions
					.filter((s) => s.day.toLowerCase().startsWith(d.name.toLowerCase().substring(0, 3)))
					.sort((a, b) => a.time.localeCompare(b.time));
				return {
					...d,
					sessions: daySessions
				};
			})
			.filter((d) => d.sessions.length > 0)
	);

	const filteredSessions = $derived(
		selectedCategory === 'all'
			? rawSessions
			: rawSessions.filter((s) => s.category === selectedCategory)
	);
</script>

<div class="my-6 not-prose">
	<!-- Termin Active Banner -->
	<div class="bg-card border border-border p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
		<div>
			<span class="text-[11px] font-bold uppercase tracking-widest text-primary">Aktuell Termin</span>
			<h2 class="text-xl font-bold text-foreground mt-0.5">{terminInfo.name}</h2>
			{#if terminInfo.start && terminInfo.end}
				<p class="text-xs font-medium text-foreground/70 mt-1">
					Schemat gäller från <strong>{terminInfo.start}</strong> till <strong>{terminInfo.end}</strong>.
				</p>
			{/if}
			{#if terminInfo.infoText}
				<p class="text-xs text-foreground/60 mt-1 italic">{terminInfo.infoText}</p>
			{/if}
		</div>
	</div>

	<!-- View Switcher Toolbar -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/40 border border-border/80 p-3 mb-6">
		<div class="flex items-center gap-1">
			<button
				type="button"
				onclick={() => (activeView = 'weekly')}
				class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer {activeView === 'weekly'
					? 'bg-primary text-primary-foreground shadow-xs'
					: 'bg-background text-foreground/70 border border-border hover:text-foreground'}"
			>
				<CalendarDays class="h-3.5 w-3.5" />
				Veckoschema
			</button>

			<button
				type="button"
				onclick={() => (activeView = 'age')}
				class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer {activeView === 'age'
					? 'bg-primary text-primary-foreground shadow-xs'
					: 'bg-background text-foreground/70 border border-border hover:text-foreground'}"
			>
				<Users class="h-3.5 w-3.5" />
				Filtrera efter åldersgrupp
			</button>
		</div>

		<span class="text-[11px] font-medium text-foreground/60 px-1">
			{#if activeView === 'weekly'}
				Visar hela träningsveckan måndag–söndag
			{:else}
				Välj en ålderskategori nedan
			{/if}
		</span>
	</div>

	{#if activeView === 'weekly'}
		<!-- WEEKLY OVERVIEW (Dag för dag) -->
		<div class="space-y-6 mb-10">
			{#each weeklySchedule as dayGroup}
				<div class="border border-border/80 bg-card shadow-xs overflow-hidden">
					<!-- Day Header -->
					<div class="bg-primary/10 border-b border-primary/20 px-5 py-3 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<Calendar class="h-4 w-4 text-primary" />
							<h3 class="text-base font-bold text-foreground uppercase tracking-wide">
								{dayGroup.name}
							</h3>
						</div>
						<span class="text-xs font-bold text-primary font-mono">
							{dayGroup.sessions.length} {dayGroup.sessions.length === 1 ? 'träningspass' : 'träningspass'}
						</span>
					</div>

					<!-- Day Sessions List -->
					<div class="divide-y divide-border/60">
						{#each dayGroup.sessions as session}
							<div class="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
								<div class="flex items-start gap-4">
									<!-- Time badge -->
									<div class="shrink-0 w-32 px-3 py-1.5 bg-muted text-foreground font-bold text-xs flex items-center gap-1.5 justify-center">
										<Clock class="h-3.5 w-3.5 text-foreground/50" />
										<span>{session.time}</span>
									</div>

									<!-- Group details -->
									<div>
										<div class="flex flex-wrap items-center gap-2 mb-1">
											<h4 class="text-base font-bold text-foreground">{session.group}</h4>
											<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-primary/10 text-primary border border-primary/20">
												{session.age}
											</span>
										</div>
										<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/70">
											<span><strong>Bälte:</strong> {session.belt}</span>
											<span>•</span>
											<span class="italic text-foreground/60">{session.level}</span>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- AGE-FILTERED CARD VIEW -->
		<!-- Filter buttons -->
		<div class="flex flex-wrap gap-2 mb-6">
			{#each categories as cat}
				<button
					type="button"
					onclick={() => (selectedCategory = cat.id)}
					class="px-4 py-2 text-xs md:text-sm font-semibold rounded-none border transition-all duration-200 cursor-pointer {selectedCategory === cat.id
						? 'bg-primary text-primary-foreground border-primary shadow-sm'
						: 'bg-background text-foreground/70 border-border hover:border-foreground/40 hover:text-foreground'}"
				>
					{cat.label}
				</button>
			{/each}
		</div>

		<!-- Sessions grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
			{#each filteredSessions as session}
				<div class="flex flex-col bg-card border border-border/70 p-5 hover:border-primary/50 transition-all duration-200 shadow-sm">
					<div class="flex items-center justify-between gap-2 mb-3">
						<span class="inline-flex items-center px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary">
							{session.day}
						</span>
						<span class="text-xs font-bold text-foreground/80 bg-muted px-2 py-0.5">
							{session.time}
						</span>
					</div>

					<h3 class="text-lg font-bold text-foreground mb-1">{session.group}</h3>
					
					<div class="mt-2 space-y-1.5 text-xs text-foreground/70">
						<div class="flex items-center gap-2">
							<span class="font-semibold text-foreground/50 w-16">Ålder:</span>
							<span>{session.age}</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="font-semibold text-foreground/50 w-16">Bälte:</span>
							<span class="font-medium text-foreground/90">{session.belt}</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="font-semibold text-foreground/50 w-16">Nivå:</span>
							<span class="italic text-foreground/60">{session.level}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Try judo callout -->
	<div class="mt-8 bg-muted/40 border-l-4 border-primary p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<h4 class="font-bold text-foreground text-sm">Vill du prova på Judo?</h4>
			<p class="text-xs text-foreground/70 mt-1">
				Hos oss får du alltid prova på <strong>3 gånger gratis</strong>! Kom i vanliga mjuka träningskläder (långbyxor och t-shirt).
				{#if terminInfo.intakeEnd}
					Intag av nya medlemmar är öppet fram till <strong>{terminInfo.intakeEnd}</strong>.
				{/if}
			</p>
		</div>
		<a
			href="/borjatrana"
			class="inline-flex items-center justify-center px-4 py-2.5 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider hover:bg-foreground transition-colors shrink-0"
		>
			Läs mer inför första passet
		</a>
	</div>
</div>
