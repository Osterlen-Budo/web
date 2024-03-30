<script>
	import '../app.pcss';
	
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Card, Button } from 'flowbite-svelte';
	import logo  from '$lib/assets/logo_no_text.png'
</script>

<div class="grid  sm:grid-cols-2 md:grid-cols-md sm:bg-red-50 md:bg-blue-50">
	<div class="fixed w-full t-0 left-0 sm:col-span-2 md:col-span-4">
		<Navbar class="border-b-2 t-0" >
			<NavBrand href="/">
			<img src={logo} class="me-3 h-6 sm:h-9" alt="Österlen Budo Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Österlen Budoklubb</span>
			</NavBrand>
			<NavHamburger  />
			<NavUl >
			<NavLi href="/">Hem</NavLi>
			<NavLi href="/about">Bli medlem</NavLi>
			<NavLi href="/docs/components/navbar">Träning</NavLi>
			<NavLi href="/pricing">Medlemsinfo</NavLi>
			<NavLi href="/contact">Kalendarium</NavLi>
			<NavLi href="/contact">Om Klubben</NavLi>
			<NavLi href="/contact">Kontakt</NavLi>
			</NavUl>
		</Navbar>
	</div>
	<slot />
	<div class="flex md:flex-col" >
		<div class="w-80 md:justify-self-start">
			<div class="">
				<h5 class="mb-2 text-2xl font-thin border-b	tracking-tight text-gray-900 dark:text-white ">På gång</h5>
				<b class="bg-red-50">Mars</b>
				<p class="font-thin mb-2 text-gray-700 dark:text-gray-400 leading-tight">
					31/3 - Skåneserien i knislinge 
				</p>
				<b>April</b>
			</div>
		</div>
		<div  class="sm:max-w-80 justify-self-start mb-10 mx-10">
			<h5 class="mb-4 text-2xl font-thin border-b	 tracking-tight text-gray-900 dark:text-white">Sponsorer</h5>
			<img src="/images/sjobo_elnat.png" class="w-auto" alt="Sjöbo Elnät Logo"/>
			<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight"></p>
		</div>
		<div  class="sm:max-w-80 justify-self-start mb-10 mx-10">
			<h5 class="mb-4 text-2xl font-thin border-b	 tracking-tight text-gray-900 dark:text-white">Kontakt</h5>
			<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Telefon</p>
		</div>
	</div>
</div>