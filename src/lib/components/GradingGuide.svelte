<script lang="ts">
	import { Play, ExternalLink, Award, CheckCircle, Video, BookOpen, Shield } from 'lucide-svelte';

	type BeltGrade = {
		grade: string;
		name: string;
		type: 'kyu' | 'mon' | 'dan';
		color: string;
		stripe?: string;
		videoUrl?: string;
		description: string;
	};

	const belts: BeltGrade[] = [
		{
			grade: '6 Kyu',
			name: 'Vitt bälte',
			type: 'kyu',
			color: '#ffffff',
			description: 'Nybörjarbälte. Här lär du dig grundläggande fallteknik (ukemi), hälsningsceremoni och enkla kast.'
		},
		{
			grade: 'Mon-grad',
			name: 'Vit-gult bälte',
			type: 'mon',
			color: '#ffffff',
			stripe: '#eab308',
			videoUrl: 'https://www.youtube.com/watch?v=2DsVvDw7b8g&list=PLDb6lNXmB3P4sEhjX-PP_EGrqsLMpPKzM',
			description: 'Första delmålet för barn och ungdomar. Grundläggande fasthållningar och kast.'
		},
		{
			grade: '5 Kyu',
			name: 'Gult bälte',
			type: 'kyu',
			color: '#eab308',
			videoUrl: 'https://www.youtube.com/watch?v=jeQ541ScLB4&list=PLDb6lNXmB3P5fif3ttjAi08I1rvGbFNz2',
			description: 'Helt gult bälte. Du behärskar fler kast som O-soto-gari och O-goshi samt fasthållningar.'
		},
		{
			grade: 'Mon-grad',
			name: 'Gul-orange bälte',
			type: 'mon',
			color: '#eab308',
			stripe: '#f97316',
			videoUrl: 'https://www.youtube.com/watch?v=4BUUvqxi_Kk&list=PLDb6lNXmB3P7tbEsJ0lWy5ujLF48wzCeC',
			description: 'Mellanbälte för barn. Fördjupning i kombinationer och förflyttningar.'
		},
		{
			grade: '4 Kyu',
			name: 'Orange bälte',
			type: 'kyu',
			color: '#f97316',
			videoUrl: 'https://www.youtube.com/watch?v=c-A_nP7mKAc&list=PLDb6lNXmB3P7u-o4hy6GRIkUWZAJq03qn',
			description: 'Avancerade grundtekniker som Seoi-nage och Tai-otoshi samt vändningar i mattan.'
		},
		{
			grade: 'Mon-grad',
			name: 'Orange-grönt bälte',
			type: 'mon',
			color: '#f97316',
			stripe: '#22c55e',
			videoUrl: 'https://www.youtube.com/watch?v=nw1ZdRjrdRI&list=PLDb6lNXmB3P4676naLMKKu6Gy950rhtgA',
			description: 'Mellanbälte för ungdomar. Ökad förståelse för motattacker och kontringstekniker.'
		},
		{
			grade: '3 Kyu',
			name: 'Grönt bälte',
			type: 'kyu',
			color: '#22c55e',
			videoUrl: 'https://www.youtube.com/watch?v=gGPXvWL8VbE&list=PLDb6lNXmB3P7O5adCn_GWLJ82csOmVz_p',
			description: 'Mellangrad i judo. Högre krav på precision, timing, kontringar och snabba övergångar.'
		},
		{
			grade: 'Mon-grad',
			name: 'Grön-blått bälte',
			type: 'mon',
			color: '#22c55e',
			stripe: '#3b82f6',
			videoUrl: 'https://www.youtube.com/watch?v=SnZciTAY9vc&list=PLDb6lNXmB3P6wmEwRNVqEKdnIEPC8JUS0',
			description: 'Förberedande för avancerad judo och regionala tävlingar.'
		},
		{
			grade: '2 Kyu',
			name: 'Blått bälte',
			type: 'kyu',
			color: '#3b82f6',
			videoUrl: 'https://www.youtube.com/watch?v=iUpSu5J-bgw&list=PLDb6lNXmB3P7ZotITLewbxsYRVvShu9i1',
			description: 'Avancerad grad. Djup teknisk förståelse, komplexa kast och rörlighet.'
		},
		{
			grade: 'Mon-grad',
			name: 'Blå-brunt bälte',
			type: 'mon',
			color: '#3b82f6',
			stripe: '#78350f',
			videoUrl: 'https://www.youtube.com/watch?v=4pQd_bEnlf0&list=PLDb6lNXmB3P4ippWMyC8O-1-79dFJNyG0',
			description: 'Sista ungdomsgraden innan det bruna bältet.'
		},
		{
			grade: '1 Kyu',
			name: 'Brunt bälte',
			type: 'kyu',
			color: '#78350f',
			description: 'Högsta kyu-graden. Förberedelse inför svart bälte med fokus på Kata, teori och instruktörsansvar.'
		},
		{
			grade: '1–10 Dan',
			name: 'Svart bälte (Mästargrad)',
			type: 'dan',
			color: '#111827',
			description: 'Mästargrad. Gradering sker centralt inför Svenska Judoförbundets examinatorer (från 16 år).'
		}
	];

	let filterType = $state<'all' | 'kyu' | 'mon'>('all');

	const filteredBelts = $derived(
		belts.filter((b) => {
			if (filterType === 'all') return true;
			if (filterType === 'kyu') return b.type === 'kyu' || b.type === 'dan';
			if (filterType === 'mon') return b.type === 'mon' || b.grade === '6 Kyu';
			return true;
		})
	);
</script>

<div class="my-6 not-prose">
	<!-- Filter Tabs -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/80 p-5 mb-6 shadow-xs">
		<div>
			<span class="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">Bältesordning</span>
			<h3 class="text-lg font-bold text-foreground mt-0.5">Från vitt till svart bälte</h3>
		</div>

		<div class="flex items-center gap-1">
			<button
				type="button"
				onclick={() => (filterType = 'all')}
				class="px-3 py-1.5 text-xs font-semibold rounded-none border transition-colors cursor-pointer {filterType === 'all'
					? 'bg-primary text-primary-foreground border-primary'
					: 'bg-background text-foreground/70 border-border hover:border-foreground/40'}"
			>
				Alla grader
			</button>
			<button
				type="button"
				onclick={() => (filterType = 'kyu')}
				class="px-3 py-1.5 text-xs font-semibold rounded-none border transition-colors cursor-pointer {filterType === 'kyu'
					? 'bg-primary text-primary-foreground border-primary'
					: 'bg-background text-foreground/70 border-border hover:border-foreground/40'}"
			>
				Hela bälten (Kyu/Dan)
			</button>
			<button
				type="button"
				onclick={() => (filterType = 'mon')}
				class="px-3 py-1.5 text-xs font-semibold rounded-none border transition-colors cursor-pointer {filterType === 'mon'
					? 'bg-primary text-primary-foreground border-primary'
					: 'bg-background text-foreground/70 border-border hover:border-foreground/40'}"
			>
				Barn/Ungdom (Mon-bälten)
			</button>
		</div>
	</div>

	<!-- Belts Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
		{#each filteredBelts as belt}
			<div class="flex flex-col justify-between bg-card border border-border/80 p-5 hover:border-primary/50 transition-all duration-200 shadow-xs group">
				<div>
					<!-- Header: Grade tag + Belt Bar -->
					<div class="flex items-center justify-between gap-3 mb-3">
						<span class="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-muted text-foreground/70">
							{belt.grade}
						</span>

						<!-- Belt Color Bar Representation -->
						<div
							class="w-20 h-4 rounded-none border border-black/20 shadow-2xs relative overflow-hidden"
							style="background-color: {belt.color};"
						>
							{#if belt.stripe}
								<div
									class="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2"
									style="background-color: {belt.stripe};"
								></div>
							{/if}
						</div>
					</div>

					<h4 class="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-1">
						{belt.name}
					</h4>

					<p class="text-xs text-foreground/70 leading-relaxed mb-4">
						{belt.description}
					</p>
				</div>

				{#if belt.videoUrl}
					<div class="pt-3 border-t border-border/50 flex items-center justify-between mt-auto">
						<span class="text-[11px] font-mono text-foreground/50 flex items-center gap-1">
							<Video class="h-3 w-3 text-primary" />
							Instruktionsvideo
						</span>
						<a
							href={belt.videoUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:bg-foreground transition-colors"
						>
							<Play class="h-3 w-3 fill-current" />
							Se tekniker
						</a>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
