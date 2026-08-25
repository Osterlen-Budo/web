<script lang="ts">
	type Term = {
		japanese: string;
		swedish: string;
		category: 'Kommandon' | 'Poäng & Regler' | 'Utrustning & Plats' | 'Hälsning & Filosofi' | 'Tekniker & Kast';
		description?: string;
	};

	const terms: Term[] = [
		// Kommandon
		{ japanese: 'Hajime', swedish: 'Börja / Starta', category: 'Kommandon', description: 'Domarens signal för att starta eller återuppta matchen.' },
		{ japanese: 'Matte', swedish: 'Bryt / Stopp', category: 'Kommandon', description: 'Domarens signal för att tillfälligt stoppa matchen.' },
		{ japanese: 'Sono-mama', swedish: 'Frys / Rör er inte', category: 'Kommandon', description: 'Kommando för att hålla positionen i mattkamp.' },
		{ japanese: 'Yoshi', swedish: 'Fortsätt', category: 'Kommandon', description: 'Kommando för att återuppta efter Sono-mama.' },
		{ japanese: 'Sore-made', swedish: 'Slut på matchen', category: 'Kommandon', description: 'Matchen är över (full tid eller avgörande poäng).' },

		// Poäng & Regler
		{ japanese: 'Ippon', swedish: 'Full poäng (Vinst)', category: 'Poäng & Regler', description: 'Avgörande poäng (10 poäng). Avslutar matchen direkt.' },
		{ japanese: 'Waza-ari', swedish: 'Halv poäng', category: 'Poäng & Regler', description: 'Halv poäng (7 poäng). Två Waza-ari ger Ippon (Waza-ari Awasete Ippon).' },
		{ japanese: 'Osaekomi', swedish: 'Fasthållning påbörjad', category: 'Poäng & Regler', description: 'Domaren signalerar att giltig fasthållning har inletts.' },
		{ japanese: 'Toketa', swedish: 'Fasthållning bruten', category: 'Poäng & Regler', description: 'Fasthållningen har upphört.' },
		{ japanese: 'Shido', swedish: 'Varning / Bestraffning', category: 'Poäng & Regler', description: 'Lättare regelbrott. Tre Shido ger diskvalificering.' },
		{ japanese: 'Hansoku-make', swedish: 'Diskvalificering', category: 'Poäng & Regler', description: 'Grovt regelbrott eller ackumulerade varningar.' },

		// Utrustning & Plats
		{ japanese: 'Dojo', swedish: 'Träningslokal', category: 'Utrustning & Plats', description: 'Platsen där man tränar judo ("vägens plats").' },
		{ japanese: 'Tatami', swedish: 'Judomatta', category: 'Utrustning & Plats', description: 'Den traditionella tränings- och tävlingsmattan.' },
		{ japanese: 'Judogi', swedish: 'Judodräkt', category: 'Utrustning & Plats', description: 'Den vita eller blå träningsdräkten i kraftig bomull.' },
		{ japanese: 'Obi', swedish: 'Bälte', category: 'Utrustning & Plats', description: 'Bältet som visar grad och håller ihop dräkten.' },
		{ japanese: 'Zori', swedish: 'Tofflor / Sandaler', category: 'Utrustning & Plats', description: 'Används utanför mattan för att hålla tatamin ren.' },

		// Hälsning & Filosofi
		{ japanese: 'Rei', swedish: 'Buga / Hälsa', category: 'Hälsning & Filosofi', description: 'Tecken på ömsesidig respekt och vördnad.' },
		{ japanese: 'Sensei', swedish: 'Lärare / Tränare', category: 'Hälsning & Filosofi', description: 'Huvudtränare eller mästare ("den som gått före").' },
		{ japanese: 'Tori', swedish: 'Utföraren (den som kastar)', category: 'Hälsning & Filosofi', description: 'Den person i övningen som utför tekniken.' },
		{ japanese: 'Uke', swedish: 'Mottagaren (den som faller)', category: 'Hälsning & Filosofi', description: 'Den person i övningen som tar emot tekniken och faller.' },
		{ japanese: 'Jita Kyoei', swedish: 'Ömsesidig välfärd och nytta', category: 'Hälsning & Filosofi', description: 'En av Judons två grundprinciper (Jigoro Kano).' },
		{ japanese: 'Seiryoku Zenyo', swedish: 'Bästa möjliga användning av energi', category: 'Hälsning & Filosofi', description: 'Maximal effektivitet med minimal ansträngning.' },

		// Tekniker & Kast
		{ japanese: 'Ukemi', swedish: 'Fallteknik', category: 'Tekniker & Kast', description: 'Konsten att falla mjukt och säkert utan att skada sig.' },
		{ japanese: 'Nage-waza', swedish: 'Kasttekniker', category: 'Tekniker & Kast', description: 'Samlingsnamn för alla stående kasttekniker.' },
		{ japanese: 'Ne-waza', swedish: 'Mattkampstekniker', category: 'Tekniker & Kast', description: 'Fasthållningar, armlås och halslås i markläge.' },
		{ japanese: 'Randori', swedish: 'Fri sparring / Träningsmatch', category: 'Tekniker & Kast', description: 'Fri träning där man prövar tekniker mot rörlig motståndare.' },
		{ japanese: 'Kata', swedish: 'Förutbestämda formmönster', category: 'Tekniker & Kast', description: 'Traditionellt system för att bevara och förstå principer.' }
	];

	let searchQuery = $state('');
	let selectedCategory = $state<string>('Alla');

	const categories = ['Alla', 'Kommandon', 'Poäng & Regler', 'Utrustning & Plats', 'Hälsning & Filosofi', 'Tekniker & Kast'];

	const filteredTerms = $derived(
		terms.filter((term) => {
			const matchesCategory = selectedCategory === 'Alla' || term.category === selectedCategory;
			const q = searchQuery.toLowerCase().trim();
			const matchesSearch =
				!q ||
				term.japanese.toLowerCase().includes(q) ||
				term.swedish.toLowerCase().includes(q) ||
				(term.description && term.description.toLowerCase().includes(q));
			return matchesCategory && matchesSearch;
		})
	);
</script>

<div class="my-8 not-prose">
	<!-- Search & Filter bar -->
	<div class="flex flex-col sm:flex-row gap-3 mb-6">
		<div class="relative flex-1">
			<input
				type="text"
				placeholder="Sök japanskt eller svenskt ord (t.ex. Ippon, Matte, Buga)..."
				bind:value={searchQuery}
				class="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
			/>
			{#if searchQuery}
				<button
					type="button"
					onclick={() => (searchQuery = '')}
					class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-foreground/40 hover:text-foreground"
				>
					Rensa
				</button>
			{/if}
		</div>
	</div>

	<!-- Category Filter Pills -->
	<div class="flex flex-wrap gap-2 mb-6">
		{#each categories as cat}
			<button
				type="button"
				onclick={() => (selectedCategory = cat)}
				class="px-3 py-1.5 text-xs font-semibold rounded-none border transition-colors cursor-pointer {selectedCategory === cat
					? 'bg-primary text-primary-foreground border-primary'
					: 'bg-background text-foreground/70 border-border hover:border-foreground/40'}"
			>
				{cat}
			</button>
		{/each}
	</div>

	<!-- Results count -->
	<p class="text-xs text-foreground/50 mb-4">
		Visar {filteredTerms.length} av {terms.length} ord
	</p>

	<!-- Terms List -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
		{#each filteredTerms as term}
			<div class="bg-card border border-border/70 p-4 hover:border-primary/40 transition-colors shadow-sm">
				<div class="flex items-baseline justify-between gap-2 mb-1">
					<h3 class="text-base font-bold text-foreground font-mono">{term.japanese}</h3>
					<span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-muted text-foreground/70">
						{term.category}
					</span>
				</div>
				<p class="text-sm font-semibold text-primary mb-1.5">{term.swedish}</p>
				{#if term.description}
					<p class="text-xs text-foreground/70 leading-relaxed">{term.description}</p>
				{/if}
			</div>
		{/each}

		{#if filteredTerms.length === 0}
			<div class="col-span-full py-12 text-center text-foreground/50 text-sm bg-muted/20 border border-dashed border-border">
				Inga ord matchade din sökning "{searchQuery}".
			</div>
		{/if}
	</div>
</div>
