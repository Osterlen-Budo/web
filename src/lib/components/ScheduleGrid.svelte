<script lang="ts">
	import terminData from '../../pages/termin.json';
	import schemaData from '../../pages/schema.json';
	import {
		Calendar,
		Users,
		Clock,
		Shield,
		Sparkles,
		LayoutGrid,
		CalendarDays
	} from 'lucide-svelte';

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

<div class="not-prose my-6">
	<!-- Termin Active Banner -->
	<div
		class="bg-card border-border mb-8 flex flex-col justify-between gap-4 border p-5 shadow-sm sm:flex-row sm:items-center"
	>
		<div>
			<span class="text-primary text-[11px] font-bold uppercase tracking-widest"
				>Aktuell Termin</span
			>
			<h2 class="text-foreground mt-0.5 text-xl font-bold">{terminInfo.name}</h2>
			{#if terminInfo.start && terminInfo.end}
				<p class="text-foreground/70 mt-1 text-xs font-medium">
					Schemat gäller från <strong>{terminInfo.start}</strong> till
					<strong>{terminInfo.end}</strong>.
				</p>
			{/if}
			{#if terminInfo.infoText}
				<p class="text-foreground/60 mt-1 text-xs italic">{terminInfo.infoText}</p>
			{/if}
		</div>
	</div>

	<!-- View Switcher Toolbar -->
	<div
		class="bg-muted/40 border-border/80 mb-6 flex flex-col justify-between gap-4 border p-3 sm:flex-row sm:items-center"
	>
		<div class="flex items-center gap-1">
			<button
				type="button"
				onclick={() => (activeView = 'weekly')}
				class="inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors {activeView ===
				'weekly'
					? 'bg-primary text-primary-foreground shadow-xs'
					: 'bg-background text-foreground/70 border-border hover:text-foreground border'}"
			>
				<CalendarDays class="h-3.5 w-3.5" />
				Veckoschema
			</button>

			<button
				type="button"
				onclick={() => (activeView = 'age')}
				class="inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors {activeView ===
				'age'
					? 'bg-primary text-primary-foreground shadow-xs'
					: 'bg-background text-foreground/70 border-border hover:text-foreground border'}"
			>
				<Users class="h-3.5 w-3.5" />
				Åldersgrupp
			</button>
		</div>

		<span class="text-foreground/60 px-1 text-[11px] font-medium">
			{#if activeView === 'weekly'}
				Visar hela träningsveckan måndag–söndag
			{:else}
				Välj en ålderskategori nedan
			{/if}
		</span>
	</div>

	{#if activeView === 'weekly'}
		<!-- WEEKLY OVERVIEW (Dag för dag) -->
		<div class="mb-10 space-y-6">
			{#each weeklySchedule as dayGroup}
				<div class="border-border/80 bg-card shadow-xs overflow-hidden border">
					<!-- Day Header -->
					<div
						class="bg-primary/10 border-primary/20 flex items-center justify-between border-b px-5 py-3"
					>
						<div class="flex items-center gap-2">
							<Calendar class="text-primary h-4 w-4" />
							<h3 class="text-foreground text-base font-bold uppercase tracking-wide">
								{dayGroup.name}
							</h3>
						</div>
						<span class="text-primary font-mono text-xs font-bold">
							{dayGroup.sessions.length}
							{dayGroup.sessions.length === 1 ? 'träningspass' : 'träningspass'}
						</span>
					</div>

					<!-- Day Sessions List -->
					<div class="divide-border/60 divide-y">
						{#each dayGroup.sessions as session}
							<div
								class="hover:bg-muted/30 flex flex-col justify-between gap-4 p-5 transition-colors md:flex-row md:items-center"
							>
								<div class="flex items-start gap-4">
									<!-- Time badge -->
									<div
										class="bg-muted text-foreground flex w-32 shrink-0 items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold"
									>
										<Clock class="text-foreground/50 h-3.5 w-3.5" />
										<span>{session.time}</span>
									</div>

									<!-- Group details -->
									<div>
										<div class="mb-1 flex flex-wrap items-center gap-2">
											<h4 class="text-foreground text-base font-bold">{session.group}</h4>
											<span
												class="bg-primary/10 text-primary border-primary/20 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
											>
												{session.age}
											</span>
										</div>
										<div
											class="text-foreground/70 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs"
										>
											<span><strong>Bälte:</strong> {session.belt}</span>
											<span>•</span>
											<span class="text-foreground/60 italic">{session.level}</span>
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
		<div class="mb-6 flex flex-wrap gap-2">
			{#each categories as cat}
				<button
					type="button"
					onclick={() => (selectedCategory = cat.id)}
					class="cursor-pointer rounded-none border px-4 py-2 text-xs font-semibold transition-all duration-200 md:text-sm {selectedCategory ===
					cat.id
						? 'bg-primary text-primary-foreground border-primary shadow-sm'
						: 'bg-background text-foreground/70 border-border hover:border-foreground/40 hover:text-foreground'}"
				>
					{cat.label}
				</button>
			{/each}
		</div>

		<!-- Sessions grid -->
		<div class="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each filteredSessions as session}
				<div
					class="bg-card border-border/70 hover:border-primary/50 flex flex-col border p-5 shadow-sm transition-all duration-200"
				>
					<div class="mb-3 flex items-center justify-between gap-2">
						<span
							class="bg-primary/10 text-primary inline-flex items-center px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
						>
							{session.day}
						</span>
						<span class="text-foreground/80 bg-muted px-2 py-0.5 text-xs font-bold">
							{session.time}
						</span>
					</div>

					<h3 class="text-foreground mb-1 text-lg font-bold">{session.group}</h3>

					<div class="text-foreground/70 mt-2 space-y-1.5 text-xs">
						<div class="flex items-center gap-2">
							<span class="text-foreground/50 w-16 font-semibold">Ålder:</span>
							<span>{session.age}</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-foreground/50 w-16 font-semibold">Bälte:</span>
							<span class="text-foreground/90 font-medium">{session.belt}</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-foreground/50 w-16 font-semibold">Nivå:</span>
							<span class="text-foreground/60 italic">{session.level}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Try judo callout -->
	<div
		class="bg-muted/40 border-primary mt-8 flex flex-col justify-between gap-4 border-l-4 p-5 sm:flex-row sm:items-center"
	>
		<div>
			<h4 class="text-foreground text-sm font-bold">Vill du prova på Judo?</h4>
			<p class="text-foreground/70 mt-1 text-xs">
				Hos oss får du alltid prova på <strong>3 gånger gratis</strong>! Kom i vanliga mjuka
				träningskläder (långbyxor och t-shirt).
				{#if terminInfo.intakeEnd}
					Intag av nya medlemmar är öppet fram till <strong>{terminInfo.intakeEnd}</strong>.
				{/if}
			</p>
		</div>
		<a
			href="/borjatrana"
			class="bg-primary text-primary-foreground hover:bg-foreground inline-flex shrink-0 items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors"
		>
			Läs mer inför första passet
		</a>
	</div>
</div>
