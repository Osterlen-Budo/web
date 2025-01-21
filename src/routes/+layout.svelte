<script>
	import '../app.pcss';
	import { page } from '$app/stores';
	import { clickOutside } from '$lib/clickOutside';

	import { Navbar, NavBrand } from 'flowbite-svelte';

	import logo from '$lib/assets/logo_no_text.png';
	import { navigating } from '$app/stores';
	let hideNavMenu = true;

	let selected = '';

	function toggleMenu() {
		console.log('Hide menu');
		hideNavMenu = false;
	}

	$: if ($navigating) {
		hideNavMenu = true;
	}
	$: activeUrl = $page.url.pathname;

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
		selected = '';
	}

	/**
	 * @param {string} value
	 */
	function setSelected(value) {
		selected = value === selected ? '' : value;
	}
</script>

<div class="lg:grid-cols-lg grid bg-white sm:grid-cols-2 md:grid-cols-md">
	<div class="t-0 absolute left-0 z-30 w-full sm:col-span-2 md:col-span-4">
		<Navbar class="t-0 border-b-2">
			<NavBrand href="/">
				<img src={logo} class="me-3 h-6 sm:h-9" alt="Österlen Budo Logo" />
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
					>Österlen Budoklubb</span
				>
			</NavBrand>
			<!--<NavHamburger onClick={toggleMenu} />
			<NavUl {activeUrl} hidden={hideNavMenu}>
				<NavLi href="/">Hem</NavLi>
				<NavLi href="/borjatrana">Börja träna</NavLi>
				<NavLi href="/kalendarium">Kalendarium</NavLi>
				<NavLi class="cursor-pointer">
					Träning<ChevronDownOutline class="ms-2 inline h-6 w-6 text-primary-800 dark:text-white" />
				</NavLi>
				<Dropdown class="z-20 w-44">
					<DropdownItem href="/traningspass">Hur går träning till</DropdownItem>
					<DropdownItem href="/tider">Träningstider</DropdownItem>
					<DropdownItem href="/avgifter">Avgifter</DropdownItem>
					<DropdownItem href="/vardegrund">Judons värdegrund</DropdownItem>
					<DropdownItem href="/gradering">Gradering</DropdownItem>
					<DropdownItem href="/tavla">Om tävling</DropdownItem>
					<DropdownItem href="/ordlista">Japansk-Svensk ordlista</DropdownItem>
				</Dropdown>
				<NavLi class="cursor-pointer">
					Medlemsinfo<ChevronDownOutline
						class="ms-2 inline h-6 w-6 text-primary-800 dark:text-white"
					/>
				</NavLi>
				<Dropdown class="z-20 w-44">
					<DropdownItem href="/regler">Ordningsregler</DropdownItem>
					<DropdownItem href="/judopass">Judopass</DropdownItem>
					<DropdownItem href="/forsakring">Försäkringsinformation</DropdownItem>
				</Dropdown>
				<NavLi class="cursor-pointer">
					Om klubben<ChevronDownOutline
						class="ms-2 inline h-6 w-6 text-primary-800 dark:text-white"
					/>
				</NavLi>
				<Dropdown class="z-20 w-44">
					<DropdownItem href="/styrelse">Styrelse</DropdownItem>
					<DropdownItem href="/tranare">Tränare</DropdownItem>-->
			<!-- <DropdownItem href="/">Klubbens historia</DropdownItem> -->
			<!--<DropdownItem href="/dokument">Dokument</DropdownItem>
				</Dropdown>
				<NavLi href="/kontakt">Kontakt</NavLi>
			</NavUl>-->
		</Navbar>
	</div>
	<div class="flex w-screen justify-center">
		<div
			class="absolute mb-10 mt-20 grid grid-cols-2 flex-wrap justify-center overflow-y-visible sm:gap-4 md:w-8/12 md:grid-cols-4"
		>
			{#each menuItems as menu}
				<div class="relative">
					<a
						href={menu.link}
						on:click|preventDefault={() => setSelected(menu.title)}
						class="w-42 flex h-12 items-center justify-center border-2 border-gray-100 bg-slate-100 text-center hover:bg-slate-100 sm:rounded-md"
					>
						<div class="text-md">{menu.title}</div>
					</a>
					{#if menu.sublinks}
						<div
							use:clickOutside
							on:click_outside={handleClickOutside}
							class="w-42 border-1 absolute z-0 col-span-8 {selected === `${menu.title}`
								? ''
								: 'hidden'} w-full bg-slate-100 shadow-2xl shadow-black"
						>
							{#each menu.sublinks as sub}
								<div
									class="border-2 border-slate-50 bg-slate-50 p-2 text-sm font-medium hover:bg-slate-200"
								>
									<a href={sub.link}>{sub.title}</a>
								</div>
								<!-- content here -->
							{/each}
						</div>

						<!-- content here -->
					{/if}
				</div>
			{/each}

			<slot />
		</div>
	</div>
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
</div>
