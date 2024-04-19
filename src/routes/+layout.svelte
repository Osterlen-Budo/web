<script>
	import '../app.pcss';
	import { page } from '$app/stores';

	import {Navbar, NavBrand, NavUl, NavLi, NavHamburger, DropdownItem, Dropdown} from 'flowbite-svelte'
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	import logo  from '$lib/assets/logo_no_text.png'
	$: activeUrl = $page.url.pathname
</script>

<div class="grid  sm:grid-cols-2 md:grid-cols-md lg:grid-cols-lg ">
	<div class="fixed w-full t-0 left-0 sm:col-span-2 md:col-span-4">
		
		<Navbar class="border-b-2 t-0" >
			<NavBrand href="/">
			<img src={logo} class="me-3 h-6 sm:h-9" alt="Österlen Budo Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Österlen Budoklubb</span>
			</NavBrand>
			<NavHamburger  />
			<NavUl {activeUrl}>
				<NavLi href="/">Hem</NavLi>
				<NavLi href="/borjatrana">Börja träna</NavLi>
				<NavLi class="cursor-pointer">
					Träning<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
				</NavLi>
				<Dropdown class="w-44 z-20">
					<DropdownItem href="/traningspass">Hur går träning till</DropdownItem>
					<DropdownItem href="/tider">Träningstider</DropdownItem>
					<DropdownItem href="/avgifter">Avgifter</DropdownItem>
					<DropdownItem href="/vardegrund">Judons Värdegrund</DropdownItem>
					<DropdownItem href="/gradering">Gradering</DropdownItem>
					<DropdownItem href="/tavla">Om tävling</DropdownItem>
				</Dropdown>
				<NavLi href="/kontakt">Kontakt</NavLi>
				<NavLi href="/avgifter">Medlemsinfo</NavLi>
				<NavLi href="/kalendarium">Kalendarium</NavLi>
				<NavLi class="cursor-pointer">
					Om klubben<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
				</NavLi>
					<Dropdown class="w-44 z-20">
						<DropdownItem href="/klubben/styrelsen">Styrelsen</DropdownItem>
						<DropdownItem href="/docs/components/navbar">Våra tränare</DropdownItem>
						<DropdownItem href="/">Klubbens Historia</DropdownItem>
					</Dropdown>
				<NavLi href="/kontakt">Kontakt</NavLi>
			</NavUl>
		</Navbar>
	</div>
	<slot />
	<div class="flex-col sm:col-span-2 sm:w-full md:col-span-1 md:col-start-3 md:mx-0" >
		<div class="sm:w-full justify-self-start mb-10 mx-10">
			<div class="">
				<h5 class="mb-2 text-2xl font-thin border-b	tracking-tight text-gray-900 dark:text-white ">På gång</h5>
				<b class="bg-red-50">Mars</b>
				<p class="font-thin mb-2 text-gray-700 dark:text-gray-400 leading-tight">
					31/3 - Skåneserien i knislinge 
				</p>
				<b>April</b>
			</div>
		</div>
		<div  class="sm:w-auto justify-self-start mb-10 mx-10 sm:col-span-2">
			<h5 class="mb-4 text-2xl font-thin border-b	 tracking-tight text-gray-900 dark:text-white">Sponsorer</h5>
			<img src="/images/sjobo_elnat.png" class="w-auto" alt="Sjöbo Elnät Logo"/>
			<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight"></p>
		</div>
		<div  class="sm:w-full justify-self-start mb-10 mx-10 sm:col-span-2">
			<h5 class="mb-4 text-2xl font-thin border-b	 tracking-tight text-gray-900 dark:text-white">Kontakt</h5>
			<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Telefon</p>
		</div>
	</div>
</div>