<script lang="ts">
	import { FileText, Download, Search, Shield, BookOpen, FileCheck, Calendar } from 'lucide-svelte';

	type DocItem = {
		title: string;
		category: 'governance' | 'protocol' | 'report' | 'policy';
		categoryLabel: string;
		date: string;
		url: string;
		description?: string;
	};

	const documents: DocItem[] = [
		// Stadgar & Policys
		{
			title: 'ÖBK Stadgar',
			category: 'governance',
			categoryLabel: 'Stadgar',
			date: '2025-05-21',
			url: '/files/ÖBK_Stadgar_20260521.pdf',
			description: 'Föreningens gällande stadgar fastställda vid årsmöte.'
		},
		{
			title: 'Integritetspolicy (GDPR)',
			category: 'policy',
			categoryLabel: 'Policy',
			date: '2025-02-23',
			url: '/files/ÖBK_integritetspolicy_2025.pdf',
			description: 'Hur Österlen Budo Klubb behandlar personuppgifter och medlemsdata.'
		},
		{
			title: 'ANDT-policy',
			category: 'policy',
			categoryLabel: 'Policy',
			date: '2025-02-23',
			url: '/files/ÖBK_andt_policy.pdf',
			description: 'Föreningens policy gällande alkohol, narkotika, dopning och tobak.'
		},
		// Årsmötesprotokoll
		{
			title: 'Protokoll extra årsmöte 2026',
			category: 'protocol',
			categoryLabel: 'Årsmötesprotokoll',
			date: '2026-05-21',
			url: '/files/ÖBK_protokoll_extra_årsmöte_2026.pdf',
			description: 'Justerat protokoll från extra årsmöte 2026.'
		},
		{
			title: 'Årsmötesprotokoll 2026',
			category: 'protocol',
			categoryLabel: 'Årsmötesprotokoll',
			date: '2026-04-02',
			url: '/files/ÖBK_Årsmötesprotokoll_2026.pdf',
			description: 'Justerat protokoll från ordinarie årsmöte 2026.'
		},
		{
			title: 'Årsmötesprotokoll 2025',
			category: 'protocol',
			categoryLabel: 'Årsmötesprotokoll',
			date: '2025-03-25',
			url: '/files/ÖBK_Årsmötesprotokoll_2025.pdf',
			description: 'Justerat protokoll från ordinarie årsmöte 2025.'
		},
		{
			title: 'Årsmötesprotokoll 2024',
			category: 'protocol',
			categoryLabel: 'Årsmötesprotokoll',
			date: '2024-04-19',
			url: '/files/ÖBK_Årsmötesprotokoll_2024.pdf',
			description: 'Justerat protokoll från ordinarie årsmöte 2024.'
		},
		// Verksamhetsberättelser
		{
			title: 'Verksamhetsberättelse 2025',
			category: 'report',
			categoryLabel: 'Verksamhetsberättelse',
			date: '2026-04-02',
			url: '/files/öbk_verksamhetsberättelse_2025.pdf',
			description: 'Sammanfattning av verksamhetsåret 2025 med ekonomisk rapport.'
		},
		{
			title: 'Verksamhetsberättelse 2024',
			category: 'report',
			categoryLabel: 'Verksamhetsberättelse',
			date: '2025-02-23',
			url: '/files/ÖBK_Verksamhetsberättelse_2024.pdf',
			description: 'Sammanfattning av verksamhetsåret 2024 med ekonomisk rapport.'
		},
		{
			title: 'Verksamhetsberättelse 2023',
			category: 'report',
			categoryLabel: 'Verksamhetsberättelse',
			date: '2024-04-19',
			url: '/files/ÖBK_Verksamhetsberättelse_2023.pdf',
			description: 'Sammanfattning av verksamhetsåret 2023 med ekonomisk rapport.'
		}
	];

	let searchQuery = $state('');
	let selectedCategory = $state<'all' | 'governance' | 'protocol' | 'report' | 'policy'>('all');

	const categories = [
		{ id: 'all', label: 'Alla dokument' },
		{ id: 'governance', label: 'Stadgar' },
		{ id: 'policy', label: 'Policys' },
		{ id: 'protocol', label: 'Årsmötesprotokoll' },
		{ id: 'report', label: 'Verksamhetsberättelser' }
	] as const;

	const filteredDocuments = $derived(
		documents.filter((doc) => {
			const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
			if (!matchesCategory) return false;

			if (!searchQuery.trim()) return true;
			const q = searchQuery.toLowerCase();
			return (
				doc.title.toLowerCase().includes(q) ||
				doc.categoryLabel.toLowerCase().includes(q) ||
				doc.date.includes(q) ||
				(doc.description && doc.description.toLowerCase().includes(q))
			);
		})
	);

	function formatSwedishDate(dateStr: string) {
		try {
			const d = new Date(dateStr);
			return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' });
		} catch {
			return dateStr;
		}
	}
</script>

<div class="my-6 not-prose">
	<!-- Filter & Search Toolbar -->
	<div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-card border border-border/80 p-5 mb-6 shadow-xs">
		<!-- Category filter pills -->
		<div class="flex flex-wrap gap-1.5">
			{#each categories as cat}
				<button
					type="button"
					onclick={() => (selectedCategory = cat.id)}
					class="px-3 py-1.5 text-xs font-semibold rounded-none border transition-all duration-200 cursor-pointer {selectedCategory === cat.id
						? 'bg-primary text-primary-foreground border-primary shadow-xs'
						: 'bg-background text-foreground/70 border-border hover:border-foreground/40 hover:text-foreground'}"
				>
					{cat.label}
				</button>
			{/each}
		</div>

		<!-- Search Input -->
		<div class="relative min-w-[220px]">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/40" />
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Sök dokument, år..."
				class="w-full pl-9 pr-3 py-1.5 text-xs bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
			/>
		</div>
	</div>

	<!-- Documents Grid -->
	{#if filteredDocuments.length === 0}
		<div class="text-center py-12 border border-dashed border-border bg-card/50">
			<FileText class="h-8 w-8 text-foreground/30 mx-auto mb-2" />
			<p class="text-sm font-medium text-foreground/70">Inga dokument matchade din sökning.</p>
			<button
				type="button"
				onclick={() => { searchQuery = ''; selectedCategory = 'all'; }}
				class="mt-2 text-xs font-semibold text-primary underline cursor-pointer"
			>
				Återställ filter
			</button>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each filteredDocuments as doc}
				<div class="flex flex-col justify-between bg-card border border-border/80 p-5 hover:border-primary/50 transition-all duration-200 shadow-xs group">
					<div>
						<div class="flex items-center justify-between gap-2 mb-3">
							<span class="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
								{#if doc.category === 'governance'}
									<Shield class="h-3 w-3" />
								{:else if doc.category === 'protocol'}
									<FileCheck class="h-3 w-3" />
								{:else if doc.category === 'report'}
									<BookOpen class="h-3 w-3" />
								{:else}
									<FileText class="h-3 w-3" />
								{/if}
								{doc.categoryLabel}
							</span>

							<div class="flex items-center gap-1 text-[11px] font-mono text-foreground/50">
								<Calendar class="h-3 w-3" />
								<span>{formatSwedishDate(doc.date)}</span>
							</div>
						</div>

						<h3 class="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-1.5">
							{doc.title}
						</h3>

						{#if doc.description}
							<p class="text-xs text-foreground/70 leading-relaxed mb-4">
								{doc.description}
							</p>
						{/if}
					</div>

					<div class="pt-3 mt-auto border-t border-border/60 flex items-center justify-between">
						<span class="text-[11px] font-mono text-foreground/40 uppercase">PDF-dokument</span>
						<a
							href={doc.url}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:bg-foreground transition-colors"
						>
							<Download class="h-3.5 w-3.5" />
							Öppna / Ladda ner
						</a>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Help / Contact Footer -->
	<div class="mt-8 p-4 bg-muted/30 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-foreground/70">
		<span>Saknar du något dokument eller har frågor till styrelsen?</span>
		<a href="/kontakt" class="text-primary font-semibold hover:underline">Kontakta styrelsen →</a>
	</div>
</div>
