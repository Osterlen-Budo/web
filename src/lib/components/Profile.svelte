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

	function getBeltClasses(beltText: string) {
		const b = beltText.toLowerCase();
		if (b.includes('svart') || b.includes('dan')) return 'bg-neutral-900 text-white border-neutral-700';
		if (b.includes('brun')) return 'bg-amber-900 text-amber-100 border-amber-800';
		if (b.includes('blå')) return 'bg-sky-700 text-white border-sky-600';
		if (b.includes('grön')) return 'bg-emerald-700 text-white border-emerald-600';
		if (b.includes('orange')) return 'bg-orange-600 text-white border-orange-500';
		if (b.includes('gul')) return 'bg-amber-400 text-amber-950 border-amber-300';
		return 'bg-slate-200 text-slate-800 border-slate-300';
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
			<span class="inline-flex items-center px-2 py-0.5 mt-2 rounded-sm text-[11px] font-semibold border {getBeltClasses(belt)}">
				{belt}
			</span>
		{/if}
	</div>
</div>


