<script lang="ts">
	import terminData from '../../pages/termin.json';

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
		infoText: terminData?.infoText || ''
	});


	const sessions: Session[] = [
		{
			day: 'Måndagar',
			dayOrder: 1,
			time: '18:30 – 19:30',
			group: 'Barn fortsättning',
			age: '7–12 år',
			category: 'kids',
			belt: 'Gult till orange-grönt',
			level: 'Fortsättning'
		},
		{
			day: 'Måndagar',
			dayOrder: 1,
			time: '19:30 – 21:00',
			group: 'Ungdomar & Vuxna',
			age: '13–17 år (samt grönt+ barn)',
			category: 'youth',
			belt: 'Grönt bälte och uppåt / Ungdomar',
			level: 'Mellan / Avancerad'
		},
		{
			day: 'Tisdagar',
			dayOrder: 2,
			time: '18:30 – 19:30',
			group: 'Barn nybörjare',
			age: '7–12 år',
			category: 'kids',
			belt: 'Vitt och vit-gult',
			level: 'Nybörjare'
		},
		{
			day: 'Tisdagar',
			dayOrder: 2,
			time: '19:30 – 21:00',
			group: 'Vuxna & Motion',
			age: '18+ år',
			category: 'adults',
			belt: 'Alla bälten & nybörjare',
			level: 'Alla nivåer'
		},
		{
			day: 'Onsdagar',
			dayOrder: 3,
			time: '18:30 – 19:30',
			group: 'Barn fortsättning',
			age: '7–12 år',
			category: 'kids',
			belt: 'Gult till orange-grönt',
			level: 'Fortsättning'
		},
		{
			day: 'Torsdagar',
			dayOrder: 4,
			time: '18:30 – 20:00',
			group: 'Ungdomar',
			age: '13–17 år',
			category: 'youth',
			belt: 'Barn med grönt+ och alla ungdomar',
			level: 'Mellan / Avancerad'
		},
		{
			day: 'Söndagar',
			dayOrder: 7,
			time: '09:15 – 10:00',
			group: 'Stor & Liten',
			age: '4–6 år (med förälder)',
			category: 'small',
			belt: 'Alla välkomna',
			level: 'Lek & Grundmotorik'
		}
	];

	let selectedCategory = $state<'all' | 'small' | 'kids' | 'youth' | 'adults'>('all');

	const categories = [
		{ id: 'all', label: 'Alla pass' },
		{ id: 'small', label: 'Stor & Liten (4–6 år)' },
		{ id: 'kids', label: 'Barn (7–12 år)' },
		{ id: 'youth', label: 'Ungdomar (13–17 år)' },
		{ id: 'adults', label: 'Vuxna (18+)' }
	] as const;

	const filteredSessions = $derived(
		selectedCategory === 'all'
			? sessions
			: sessions.filter((s) => s.category === selectedCategory)
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
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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

	<!-- Try judo callout -->
	<div class="mt-8 bg-muted/40 border-l-4 border-primary p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<h4 class="font-bold text-foreground text-sm">Vill du prova på Judo?</h4>
			<p class="text-xs text-foreground/70 mt-1">
				Hos oss får du alltid prova på <strong>3 gånger gratis</strong>! Kom i vanliga mjuka träningskläder (långbyxor och t-shirt).
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
