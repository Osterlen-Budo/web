<script>
	import { Heading, Button, P, Skeleton, ImagePlaceholder, TextPlaceholder } from 'svelte-5-ui-lib';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { Navbar, NavLi, NavBrand, NavUl, uiHelpers, Card } from 'svelte-5-ui-lib';
	import logo from '$lib/assets/logo.png';
	let nav = uiHelpers();

	let navStatus = $state(false);
	let toggleNav = nav.toggle;
	let closeNav = nav.close;

	$effect(() => {
		// this can be done adding nav.navStatus directly to DOM element
		// without using effect
		navStatus = nav.isOpen;
	});
</script>

<header class="body-font mt-5 w-full bg-white text-gray-700">
	<div class="flex flex-col items-center justify-center">
		<img class="mb-2" width="200" src={logo} alt="Österlen Budo" />

		<nav class="ml-6">
			<a href="klubben" class="mr-5 font-medium hover:text-gray-900">Klubben</a>
			<a href="#_" class="mr-5 font-medium hover:text-gray-900">Träning</a>
			<a href="#_" class="font-medium hover:text-gray-900">Styrelsen</a>
		</nav>
	</div>
</header>
