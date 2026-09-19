<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let {
		name,
		title,
		image,
		gif = '',
		belt = ''
	}: {
		name: string;
		title: string;
		image: string;
		gif?: string;
		belt?: string;
	} = $props();

	let overrideGif = $state<string | null>(null);
	let currentGif = $derived(overrideGif ?? gif);
	let showGif = $state(false);

	function randomInteger(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getTrans() {
		const trans = [{ x: 100 }, { x: -100 }, { y: 100 }];
		return trans[randomInteger(0, 2)];
	}

	function handleImageClick() {
		if (gif) {
			overrideGif = gif === 'random' ? `/images/gif/${randomInteger(1, 3)}.gif` : gif;
			showGif = true;
			setTimeout(() => {
				showGif = false;
				overrideGif = null;
			}, 1600);
		}
	}

	function getBeltColors(beltText: string): { top: string; bottom: string | null } {
		const raw = beltText.toLowerCase();

		const rankHierarchy = ['svart', 'brun', 'blå', 'grön', 'orange', 'gul', 'vit', 'röd'];

		const colorMap: Record<string, string> = {
			svart: 'bg-neutral-900',
			brun: 'bg-[#5c3010]',
			blå: 'bg-[#1d4ed8]',
			grön: 'bg-[#15803d]',
			orange: 'bg-[#ea580c]',
			gul: 'bg-[#eab308]',
			vit: 'bg-white',
			röd: 'bg-[#dc2626]'
		};

		// Check for compound two-color belts (e.g. "blå-brun", "brun-blå", "grön-blå", "vit-gul")
		// Higher grade color on top, lower grade color underneath
		for (let i = 0; i < rankHierarchy.length; i++) {
			for (let j = i + 1; j < rankHierarchy.length; j++) {
				const higherColor = rankHierarchy[i];
				const lowerColor = rankHierarchy[j];

				if (
					raw.includes(`${higherColor}-${lowerColor}`) ||
					raw.includes(`${lowerColor}-${higherColor}`) ||
					raw.includes(`${higherColor} - ${lowerColor}`) ||
					raw.includes(`${lowerColor} - ${higherColor}`) ||
					(raw.includes(higherColor) && raw.includes(lowerColor))
				) {
					return {
						top: colorMap[higherColor],
						bottom: colorMap[lowerColor]
					};
				}
			}
		}

		// Single color matches
		for (const [colorName, bgClass] of Object.entries(colorMap)) {
			if (raw.includes(colorName)) {
				return {
					top: bgClass,
					bottom: null
				};
			}
		}

		if (raw.includes('dan')) {
			return { top: 'bg-neutral-900', bottom: null };
		}

		return { top: 'bg-white', bottom: null };
	}
</script>

<div
	class="group relative flex flex-col w-56 sm:w-60 rounded-xl overflow-hidden bg-white border border-border/60 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/40"
>
	<div class="relative flex h-56 w-full items-end justify-center overflow-hidden bg-slate-100 dark:bg-slate-800">
		{#if showGif && currentGif}
			<img
				transition:fade={{ duration: 800 }}
				class="absolute inset-0 h-full w-full object-cover"
				src={currentGif}
				alt={title}
			/>
		{/if}

		{#if !showGif}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<img
				transition:fly={{ duration: 1600, ...getTrans() }}
				onclick={handleImageClick}
				class="max-h-full w-auto object-contain cursor-pointer transition-transform duration-300 group-hover:scale-105"
				src={image}
				alt={name}
			/>
		{/if}
	</div>
	<div class="flex flex-1 flex-col justify-start items-center p-3 text-center bg-white">
		<p class="font-bold text-sm sm:text-base tracking-tight text-gray-900 leading-snug">{name}</p>
		<p class="text-xs text-gray-600 mt-1 leading-snug">{title}</p>
		{#if belt}
			{@const colors = getBeltColors(belt)}
			<div class="inline-flex items-center gap-1.5 px-2.5 py-1 mt-2 rounded border border-slate-200 bg-slate-50 text-slate-800 text-[11px] font-semibold shadow-xs">
				<!-- Martial Arts Belt Mini Bar -->
				<span class="relative inline-flex flex-col w-6 h-3 rounded-[2px] border border-black/25 shadow-xs overflow-hidden shrink-0">
					{#if colors.bottom}
						<span class="w-full h-1/2 {colors.top}"></span>
						<span class="w-full h-1/2 {colors.bottom}"></span>
					{:else}
						<span class="w-full h-full {colors.top}"></span>
					{/if}
				</span>
				<span>{belt}</span>
			</div>
		{/if}
	</div>
</div>



