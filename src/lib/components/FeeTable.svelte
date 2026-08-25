<script lang="ts">
	import avgifterData from '../../pages/avgifter.json';
	import { CreditCard, HeartHandshake, Sparkles, Mail, CheckCircle2, ShieldCheck } from 'lucide-svelte';

	type FeeCategory = {
		name: string;
		price: string;
		period: string;
		age?: string;
		description?: string;
	};

	type Benefit = {
		title: string;
		description: string;
	};

	const data = $derived({
		title: avgifterData?.title || 'Tränings- och medlemsavgifter',
		year: avgifterData?.year || '2026',
		introText: avgifterData?.introText || 'Träningsavgifter betalas terminsvis och medlemsavgiften betalas årsvis.',
		contactEmail: avgifterData?.contactEmail || 'kassor@osterlenbudo.se',
		categories: (avgifterData?.categories || []) as FeeCategory[],
		benefits: (avgifterData?.benefits || []) as Benefit[]
	});

	function isMembershipFee(name: string) {
		const n = name.toLowerCase();
		return n.includes('medlem') || n.includes('stöd');
	}
</script>

<div class="my-6 not-prose">
	<!-- Hero Info Banner -->
	<div class="bg-card border border-border/80 p-6 mb-8 shadow-xs">
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
			<div>
				<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-2">
					<ShieldCheck class="h-3 w-3" />
					Gäller för {data.year}
				</span>
				<h2 class="text-2xl font-bold text-foreground">{data.title}</h2>
				<p class="text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2 max-w-2xl">
					{data.introText}
				</p>
			</div>
		</div>
	</div>

	<!-- Fee Cards Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
		{#each data.categories as cat}
			{@const isMember = isMembershipFee(cat.name)}
			<div class="flex flex-col justify-between bg-card border border-border/80 p-5 hover:border-primary/50 transition-all duration-200 shadow-xs group {isMember ? 'bg-muted/20' : ''}">
				<div>
					<div class="flex items-center justify-between gap-2 mb-2">
						<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 {isMember ? 'bg-foreground/10 text-foreground/70' : 'bg-primary/10 text-primary'}">
							{cat.age || 'Träning'}
						</span>
						<span class="text-[11px] font-mono text-foreground/50">{cat.period}</span>
					</div>

					<h3 class="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
						{cat.name}
					</h3>

					<div class="flex items-baseline gap-1.5 my-3">
						<span class="text-2xl sm:text-3xl font-black text-foreground">{cat.price}</span>
						<span class="text-xs text-foreground/60 font-medium">/ {cat.period.replace('per ', '')}</span>
					</div>

					{#if cat.description}
						<p class="text-xs text-foreground/70 leading-relaxed mt-2">
							{cat.description}
						</p>
					{/if}
				</div>

				<div class="mt-4 pt-3 border-t border-border/50 flex items-center gap-1.5 text-[11px] text-foreground/60">
					<CheckCircle2 class="h-3.5 w-3.5 text-primary shrink-0" />
					<span>Ingår i medlemskapet</span>
				</div>
			</div>
		{/each}
	</div>

	<!-- Benefits Section (Fritidskortet, Friskvård, etc.) -->
	{#if data.benefits && data.benefits.length > 0}
		<div class="mb-10">
			<div class="flex items-center gap-4 mb-6">
				<div class="h-px bg-border flex-1"></div>
				<h3 class="text-xs font-bold text-foreground/50 uppercase tracking-[0.2em] px-2">Förmåner & Betalning</h3>
				<div class="h-px bg-border flex-1"></div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				{#each data.benefits as benefit, idx}
					<div class="bg-card border border-border/80 p-5 shadow-xs">
						<div class="w-8 h-8 rounded-none bg-primary/10 text-primary flex items-center justify-center mb-3">
							{#if idx === 0}
								<CreditCard class="h-4 w-4" />
							{:else if idx === 1}
								<HeartHandshake class="h-4 w-4" />
							{:else}
								<Sparkles class="h-4 w-4" />
							{/if}
						</div>
						<h4 class="text-sm font-bold text-foreground mb-1">{benefit.title}</h4>
						<p class="text-xs text-foreground/70 leading-relaxed">
							{benefit.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Invoicing and Contact Box -->
	<div class="bg-muted/40 border-l-4 border-primary p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
		<div>
			<h4 class="text-sm font-bold text-foreground">Fakturering och frågor</h4>
			<p class="text-xs text-foreground/75 leading-relaxed mt-1">
				Vi fakturerar avgifterna varje termin via e-post. Vid frågor gällande avgifter, fakturor eller friskvårdskvitto, kontakta vår kassör.
			</p>
		</div>
		<a
			href="mailto:{data.contactEmail}"
			class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:bg-foreground transition-colors shrink-0"
		>
			<Mail class="h-3.5 w-3.5" />
			<span>{data.contactEmail}</span>
		</a>
	</div>
</div>
