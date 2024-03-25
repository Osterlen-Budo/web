<script>
	import '../app.pcss';
	
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import logo  from '$lib/assets/logo_no_text.png'
</script>

  
<Navbar class="px-2 sm:px-4 py-2.5 fixed  w-full z-20 top-0 start-0 border-b ">
	<NavBrand href="/">
	  <img src={logo} class="me-3 h-6 sm:h-9" alt="Österlen Budo Logo" />
	  <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Österlen Budo Klubb</span>
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
  


<slot />
