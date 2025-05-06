<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/state';
	import { clickOutside } from '$lib/clickOutside';

	//import { Navbar, NavBrand } from 'flowbite-svelte';

	import logo from '$lib/assets/logo2.png';
	import logotext from '$lib/assets/osterlenbudologo.png';
	import { navigating } from '$app/state';
	interface Props {
		children?: import('svelte').Snippet;
	}

	import { onMount } from 'svelte';

	let menuElement: HTMLElement;
	let isSticky = false;

	// onMount(() => {
	// 	const handleScroll = () => {
	// 		const rect = menuElement.getBoundingClientRect();
	// 		if (rect.top <= 0 && !isSticky) {
	// 			menuElement.classList.add('sticky', 'top-0', 'z-50');
	// 			isSticky = true;
	// 		} else if (rect.top > 0 && isSticky) {
	// 			menuElement.classList.remove('sticky', 'top-0', 'z-50');
	// 			isSticky = false;
	// 		}
	// 	};

	// 	window.addEventListener('scroll', handleScroll);

	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll);
	// 	};
	// });

	let { children }: Props = $props();

	let selected = $state('');

	$effect(() => {
		if (navigating.to) {
			selected = '';
		}
	});

	//let activeUrl = $derived(page.url.pathname);

	const menuItems = [
		{
			title: 'Börja träna',
			link: 'borjatrana'
		},
		{
			title: 'Om Klubben',
			link: 'omklubben'
		},
		{
			title: 'Medlemsinfo',
			sublinks: [
				{ title: 'Ordningsregler', link: 'regler' },
				{ title: 'Judopass', link: 'judopass' },
				{ title: 'Försäkring', link: 'forsakring' }
			]
		},
		{
			title: 'Träning',
			sublinks: [
				{ title: 'Hur går träningen till', link: 'traningspass' },
				{ title: 'Träningstider', link: 'tider' },
				{ title: 'Avgifter', link: 'avgifter' },
				{ title: 'Judons värdegrund', link: 'vardegrund' },
				{ title: 'Gradering', link: 'gradering' },
				{ title: 'Om tävling', link: 'tavla' }
			]
		}
	];

	function handleClickOutside() {
		console.log('Selected: ', selected);
		if (selected) {
			selected = '';
		}
	}

	function setSelected(value: string) {
		selected = value === selected ? '' : value;
	}
</script>

<header class=" left-0 z-30 col-span-2 h-fit w-full bg-primary md:col-span-4">
	<!-- <div class="fixed z-50 flex h-12 w-full items-center bg-primary text-sand">
		<div class="">
			<a href="/"
				><img
					src={logo}
					class="m-2 h-9 min-h-9 min-w-9 rounded-full bg-white"
					alt="Österlen Budo Logo"
				/></a
			>
		</div>
		<div class=" ">
			<a href="/" class=" whitespace-nowrap text-xl font-semibold dark:text-white">Österlen Budo</a>
		</div>
	</div> -->
</header>
<main class=" w-full justify-center justify-items-center">
	<div class="flex w-full justify-center">
		<div
			class="mb-10 mt-14 grid h-fit max-w-[1024px] grid-cols-2 flex-wrap justify-center gap-4 bg-sand md:grid-cols-4"
		>
			<a
				href="/"
				class="relative col-span-2 flex items-center justify-center overflow-hidden md:col-span-4"
			>
				<div
					class="relative col-span-2 flex items-center justify-center overflow-hidden font-thin md:col-span-4"
				>
					<img src={logotext} class="absolute w-1/3 self-start" alt="Österlen Budo Logo" />

					<img
						src={'images/judo-banner.png'}
						alt="Österlen Budo Logo"
						class=" rounded opacity-20"
					/>
				</div>
			</a>

			<menu
				class="relative col-span-2 mx-auto w-[22rem] flex-row sm:w-full md:col-span-4"
				bind:this={menuElement}
			>
				{#each menuItems as menu}
					<li class="inline-block w-1/4 min-w-40">
						<a
							href={menu.link}
							onclick={(e) => {
								setSelected(menu.title);
								e.stopPropagation();
							}}
							class="border-1 m-1 flex h-12 items-center justify-center rounded-md bg-primary text-center text-sand hover:cursor-pointer hover:bg-red-700"
						>
							<div class="text-md">{menu.title}</div>
						</a>
						{#if menu.sublinks}
							<menu
								use:clickOutside={handleClickOutside}
								class="border-1 absolute z-0 col-span-8 w-1/4 min-w-44 {selected === `${menu.title}`
									? ''
									: 'hidden'} shadow-2xl shadow-black"
							>
								{#each menu.sublinks as sub}
									<li
										class="border-2 border-sand bg-sand p-2 text-sm font-medium hover:bg-red-700 hover:text-white"
									>
										<a href={sub.link}>{sub.title}</a>
									</li>
								{/each}
							</menu>
						{/if}
					</li>
				{/each}
			</menu>

			{@render children?.()}
		</div>
	</div>
</main>
<footer class="flex h-40 w-full items-center justify-center bg-primary align-bottom text-sand">
	<div class="flex w-full justify-center">
		<div class="flex w-full max-w-[1024px] flex-col items-center justify-center">
			<p class="text-sm font-thin">© {new Date().getFullYear()} Österlen Budo</p>
			<p class="text-sm font-thin">info[at]osterlenbudo.se | Kvarngatan 1, 275 35 Sjöbo</p>
		</div>
	</div>
</footer>

<!-- <div class="flex-col sm:col-span-2 sm:w-full md:col-span-1 md:col-start-3 md:mx-0" > -->
<!-- <div class="sm:w-full justify-self-start mb-10 mx-10">
			<div class="">
				<h5 class="mb-2 text-2xl font-thin border-b	tracking-tight text-gray-900 dark:text-white ">På gång</h5>
				<b class="">April</b>
				<p class="font-thin mb-2 text-gray-700 dark:text-gray-400 leading-tight">21/4 - Skåneserien 2 i Knislinge</p>
				
				<b>Maj</b>
				<p class="font-thin mb-2 text-gray-700 dark:text-gray-400 leading-tight">12/5 - Lugi Judo Camp</p>
				<p class="font-thin mb-2 text-gray-700 dark:text-gray-400 leading-tight">28/5 - Gradering</p>	
			</div>
		</div> -->
<!-- <div  class="sm:w-auto justify-center sm:justify-self-start mb-10 mx-10 sm:col-span-2">
			<h5 class="mb-4 text-2xl font-thin border-b	 tracking-tight text-gray-900 dark:teörxt-white">Sponsorer</h5>
			<img src="/images/sponsor/Sjobo_logo.png" class="w-auto my-16 max-w-52" alt="Sjöbo"/>
			<img  src="/images/sponsor/Sparbanken-skane-logo.png" class="w-auto my-16 max-w-52" alt="Sparbanken Skåne"/>
			<img src="/images/sponsor/rf_sisu.svg" class="w-auto my-16 max-w-52" alt="RF-SISU"/>
			<img src="/images/sponsor/sjobo_elnat.png" class="w-auto my-16 max-w-52" alt="Sjöbo Elnät"/>
		</div> -->
<!-- </div> -->
