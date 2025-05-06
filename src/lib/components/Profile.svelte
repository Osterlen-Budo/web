<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	interface Props {
		name: string;
		title: string;
		image: string;
		gif: string;
		belt?: string;
	}

	let {
		name,
		title,
		image,
		gif = $bindable(),
		belt = ''
	}: Props = $props();

	let randomGif = gif === 'random' ? true : false;
	let showGif = $state(false);

	function randomInteger(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getTrans() {
		const trans = [{ x: 100 }, { x: -100 }, { y: 100 }];

		return trans[randomInteger(0, 2)];
	}

	// logic goes here
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="group relative mx-2 mb-10 h-80 w-56 overflow-hidden rounded-xl bg-slate-100">
	<div class="relative flex h-56 justify-center overflow-clip">
		{#if showGif && gif != ''}
			<img
				transition:fade={{ duration: 800 }}
				class="absolute h-full w-full align-bottom"
				src={gif}
				alt={title}
			/>
		{/if}

		<!-- svelte-ignore a11y_click_events_have_key_events -->
		{#if !showGif}
			<img
				transition:fly={{ duration: 1600, ...getTrans() }}
				onclick={() => {
					if (gif) {
						gif = randomGif ? `images/gif/${randomInteger(1, 3)}.gif` : gif;
						showGif = true;
						setTimeout(() => {
							showGif = false;
						}, 1600);
					}
				}}
				class="w-reset h-auto"
				src={image}
				alt={title}
			/>
		{/if}
	</div>
	<div class=" h-full bg-white py-3 text-center">
		<p class="font-bold tracking-tight text-gray-900 dark:text-white">{name}</p>
		<p class="-xs text-grey-50 font-thin">{title}</p>
		{#if belt}
			<p class="-xs text-grey-50 font-thin">{belt}</p>
		{/if}
	</div>
</div>
