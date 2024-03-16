<script>
	import { Heading, Button, P, Skeleton, ImagePlaceholder, TextPlaceholder } from 'svelte-5-ui-lib';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { Navbar, NavLi, NavBrand, NavUl, uiHelpers, Card } from 'svelte-5-ui-lib';
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
