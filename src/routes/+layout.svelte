<script>
	import '../app.pcss';
	import { page } from '$app/stores';

	import {
		Navbar,
		NavBrand,
		NavUl,
		NavLi,
		NavHamburger,
		DropdownItem,
		Dropdown
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	import logo from '$lib/assets/logo_no_text.png';
	import { navigating } from '$app/stores';
	let hideNavMenu = true;

	function toggleMenu() {
		console.log('Hide menu');
		hideNavMenu = false;
	}

	$: if ($navigating) {
		hideNavMenu = true;
	}
	$: activeUrl = $page.url.pathname;
</script>

<div class="lg:grid-cols-lg grid bg-white sm:grid-cols-2 md:grid-cols-md">
	<div class="t-0 fixed left-0 z-30 w-full sm:col-span-2 md:col-span-4">
		<Navbar class="t-0 border-b-2">
			<NavBrand href="/">
				<img src={logo} class="me-3 h-6 sm:h-9" alt="Österlen Budo Logo" />
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
					>Österlen Budoklubb</span
				>
			</NavBrand>
			<NavHamburger onClick={toggleMenu} />
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
					<DropdownItem href="/tranare">Tränare</DropdownItem>
					<DropdownItem href="/historia">Klubbens historia</DropdownItem>
					<DropdownItem href="/dokument">Dokument</DropdownItem>
				</Dropdown>
				<NavLi href="/kontakt">Kontakt</NavLi>
			</NavUl>
		</Navbar>
	</div>
	<slot />
	<div class="flex-col sm:col-span-2 sm:w-full md:col-span-1 md:col-start-3 md:mx-0">
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
		<div class="mx-10 mb-10 justify-center sm:col-span-2 sm:w-auto sm:justify-self-start">
			<h5 class="mb-4 border-b text-2xl font-thin tracking-tight text-gray-900 dark:text-white">
				Sponsorer
			</h5>
			<img src="/images/sponsor/Sjobo_logo.png" class="my-16 w-auto max-w-52" alt="Sjöbo" />
			<img
				src="/images/sponsor/Sparbanken-skane-logo.png"
				class="my-16 w-auto max-w-52"
				alt="Sparbanken Skåne"
			/>
			<img src="/images/sponsor/rf_sisu.svg" class="my-16 w-auto max-w-52" alt="RF-SISU" />
			<img src="/images/sponsor/sjobo_elnat.png" class="my-16 w-auto max-w-52" alt="Sjöbo Elnät" />
		</div>
	</div>
</div>
