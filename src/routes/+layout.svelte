<script>
	import '../app.pcss';
	import { page } from '$app/stores';

	import {Navbar, NavBrand, NavUl, NavLi, NavHamburger, DropdownItem, Dropdown} from 'flowbite-svelte'
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	import logo  from '$lib/assets/logo_no_text.png'
	import { navigating } from '$app/stores';
	let hideNavMenu = true

	function toggleMenu () {
		console.log("Hide menu")
		hideNavMenu = false;
	}


	$: if ($navigating) {
    	hideNavMenu = true
	}
	$: activeUrl = $page.url.pathname
	
</script>

<div class="grid  sm:grid-cols-2 md:grid-cols-md lg:grid-cols-lg bg-white">
	
	<div class="fixed w-full t-0 left-0 sm:col-span-2 md:col-span-4 z-30">
		
		<Navbar class="border-b-2 t-0" >
			<NavBrand href="/">
			<img src={logo} class="me-3 h-6 sm:h-9" alt="Österlen Budo Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Österlen Budoklubb</span>
			</NavBrand>
			<NavHamburger onClick={toggleMenu} />
			<NavUl {activeUrl} hidden={hideNavMenu}>
				<NavLi href="/">Hem</NavLi>
				<NavLi href="/borjatrana">Börja träna</NavLi>
				<NavLi href="/kalendarium">Kalendarium</NavLi>
				<NavLi class="cursor-pointer">
					Träning<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
				</NavLi>
				<Dropdown class="w-44 z-20">
					<DropdownItem href="/traningspass">Hur går träning till</DropdownItem>
					<DropdownItem href="/tider">Träningstider</DropdownItem>
					<DropdownItem href="/avgifter">Avgifter</DropdownItem>
					<DropdownItem href="/vardegrund">Judons värdegrund</DropdownItem>
					<DropdownItem href="/gradering">Gradering</DropdownItem>
					<DropdownItem href="/tavla">Om tävling</DropdownItem>
				</Dropdown>
				<NavLi class="cursor-pointer">
					Medlemsinfo<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
				</NavLi>
				<Dropdown class="w-44 z-20">
					<DropdownItem href="/regler">Ordningsregler</DropdownItem>
					<DropdownItem href="/judopass">Judopass</DropdownItem>
					<DropdownItem href="/forsakring">Försäkringsinformation</DropdownItem>
				</Dropdown>
				<NavLi class="cursor-pointer">
					Om klubben<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
				</NavLi>
					<Dropdown class="w-44 z-20">
						<DropdownItem href="/styrelsen">Styrelsen</DropdownItem>
						<DropdownItem href="/tranarna">Tränare</DropdownItem>
						<!-- <DropdownItem href="/">Klubbens historia</DropdownItem> -->
						<DropdownItem href="/dokument">Dokument</DropdownItem>

					</Dropdown>
				<NavLi href="/kontakt">Kontakt</NavLi>
			</NavUl>
		</Navbar>
	</div>
	<slot/>
	<div class="flex-col sm:col-span-2 sm:w-full md:col-span-1 md:col-start-3 md:mx-0" >
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
		<div  class="sm:w-auto justify-center sm:justify-self-start mb-10 mx-10 sm:col-span-2">
			<h5 class="mb-4 text-2xl font-thin border-b	 tracking-tight text-gray-900 dark:text-white">Sponsorer</h5>
			<img  src="/images/sponsor/Sparbanken-skane-logo.png" class="w-auto my-16 max-w-52" alt="Sparbanken Skåne"/>
			<img src="/images/sponsor/rf_sisu.svg" class="w-auto my-16 max-w-52" alt="RF-SISU"/>
			<img src="/images/sponsor/sjobo_elnat.png" class="w-auto my-16 max-w-52" alt="Sjöbo Elnät"/>
			<img src="/images/sponsor/Sjobo_logo.png" class="w-auto my-16 max-w-52" alt="Sjöbo Elnät"/>
		</div>
	</div>
</div>
