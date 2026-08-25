<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { navigating } from '$app/stores';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown, Menu, ArrowRight } from 'lucide-svelte';
	import logo from '$lib/assets/logo_no_text.png';

	let { children } = $props();
	let mobileMenuOpen = $state(false);

	$effect(() => {
		if ($navigating) {
			mobileMenuOpen = false;
		}
	});

	const activeUrl = $derived($page.url.pathname);
</script>

<svelte:head>
	<title>Österlen Budo | Judoklubb i Sjöbo & Österlen</title>
	<meta name="description" content="Österlen Budo Klubb – Traditionell judo för alla åldrar i Sjöbo & Österlen. Träning för barn, ungdomar och vuxna. Prova på 3 gånger gratis!" />
	<meta property="og:title" content="Österlen Budo Klubb" />
	<meta property="og:description" content="Traditionell judoträning för alla åldrar i Sjöbo & Österlen. Välkommen att prova på!" />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="flex flex-col min-h-screen bg-background font-sans text-foreground">
	<!-- Navbar Header -->
	<header class="fixed top-0 left-0 z-30 w-full bg-background/95 backdrop-blur-sm border-b border-border">
		<div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
			<!-- Logo & Brand -->
			<a href="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
				<img src={logo} class="h-10 w-auto" alt="Österlen Budo Logo" />
				<span class="self-center whitespace-nowrap text-xl font-bold text-slate-800 tracking-tight">
					Österlen Budo
				</span>
			</a>

			<!-- Desktop Menu -->
			<nav class="hidden xl:flex items-center gap-6 font-medium text-sm text-foreground/80">
				<a href="/" class="hover:text-primary transition-colors {activeUrl === '/' ? 'text-primary font-bold' : ''}">Hem</a>
				<a href="/tider" class="hover:text-primary transition-colors {activeUrl === '/tider' ? 'text-primary font-bold' : ''}">Träningstider</a>
				<a href="/kalendarium" class="hover:text-primary transition-colors {activeUrl === '/kalendarium' ? 'text-primary font-bold' : ''}">Kalendarium</a>

				<!-- Träning Dropdown -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="ghost" class="text-foreground/80 hover:text-primary hover:bg-transparent p-0 h-auto flex items-center gap-1.5 rounded-none">
								Träning <ChevronDown class="h-3.5 w-3.5 opacity-50" />
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="start" class="w-56 bg-background border border-border shadow-md p-0 rounded-none">
						<DropdownMenu.Item><a href="/traningspass" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none">Hur går träning till</a></DropdownMenu.Item>
						<DropdownMenu.Item><a href="/tider" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none border-t border-border/50">Träningstider</a></DropdownMenu.Item>
						<DropdownMenu.Item><a href="/avgifter" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none border-t border-border/50">Avgifter</a></DropdownMenu.Item>
						<DropdownMenu.Item><a href="/vardegrund" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none border-t border-border/50">Judons värdegrund</a></DropdownMenu.Item>
						<DropdownMenu.Item><a href="/gradering" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none border-t border-border/50">Gradering</a></DropdownMenu.Item>
						<DropdownMenu.Item><a href="/tavla" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none border-t border-border/50">Om tävling</a></DropdownMenu.Item>
						<DropdownMenu.Item><a href="/ordlista" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none border-t border-border/50">Japansk-Svensk ordlista</a></DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<!-- Medlemsinfo Dropdown -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="ghost" class="text-foreground/80 hover:text-primary hover:bg-transparent p-0 h-auto flex items-center gap-1.5 rounded-none">
								Medlemsinfo <ChevronDown class="h-3.5 w-3.5 opacity-50" />
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="start" class="w-56 bg-background border border-border shadow-md p-0 rounded-none">
						<DropdownMenu.Item><a href="/regler" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none">Ordningsregler</a></DropdownMenu.Item>
						<DropdownMenu.Item><a href="/judopass" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none border-t border-border/50">Judopass</a></DropdownMenu.Item>
						<DropdownMenu.Item><a href="/forsakring" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none border-t border-border/50">Försäkringsinformation</a></DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<!-- Om Klubben Dropdown -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="ghost" class="text-foreground/80 hover:text-primary hover:bg-transparent p-0 h-auto flex items-center gap-1.5 rounded-none">
								Om klubben <ChevronDown class="h-3.5 w-3.5 opacity-50" />
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="start" class="w-56 bg-background border border-border shadow-md p-0 rounded-none">
						<DropdownMenu.Item><a href="/styrelse" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none">Styrelse</a></DropdownMenu.Item>
						<DropdownMenu.Item><a href="/tranare" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none border-t border-border/50">Tränare</a></DropdownMenu.Item>
						<DropdownMenu.Item><a href="/historia" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none border-t border-border/50">Klubbens historia</a></DropdownMenu.Item>
						<DropdownMenu.Item><a href="/dokument" class="w-full block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-none border-t border-border/50">Dokument</a></DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<a href="/kontakt" class="hover:text-primary transition-colors {activeUrl === '/kontakt' ? 'text-primary font-bold' : ''}">Kontakt</a>

				<!-- Top CTA Button -->
				<Button
					href="/borjatrana"
					class="rounded-none bg-primary text-primary-foreground hover:bg-foreground transition-colors px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-sm ml-2"
				>
					Börja träna
				</Button>
			</nav>

			<!-- Mobile Trigger (Sheet) -->
			<div class="xl:hidden">
				<Sheet.Root bind:open={mobileMenuOpen}>
					<Sheet.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="ghost" size="icon" class="text-foreground rounded-none hover:bg-muted">
								<Menu class="h-5 w-5" />
							</Button>
						{/snippet}
					</Sheet.Trigger>
					<Sheet.Content side="right" class="w-80 bg-background border-l border-border p-6 flex flex-col gap-6 shadow-2xl rounded-none">
						<div class="flex items-center gap-3 pb-4 border-b border-border">
							<img src={logo} class="h-8 w-auto" alt="Österlen Budo Logo" />
							<span class="font-bold text-foreground tracking-tight">Österlen Budo</span>
						</div>

						<!-- Mobile CTA Banner -->
						<a
							href="/borjatrana"
							class="w-full text-center py-3 px-4 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-foreground transition-colors"
						>
							Börja träna – 3 ggr gratis &rarr;
						</a>

						<div class="flex flex-col flex-1 overflow-y-auto">
							<a href="/" class="py-3 px-4 rounded-none text-foreground/80 font-medium hover:text-primary hover:bg-muted transition-colors {activeUrl === '/' ? 'bg-muted text-primary font-bold' : ''}">Hem</a>
							<a href="/borjatrana" class="py-3 px-4 rounded-none text-foreground/80 font-medium hover:text-primary hover:bg-muted transition-colors {activeUrl === '/borjatrana' ? 'bg-muted text-primary font-bold' : ''}">Börja träna</a>
							<a href="/kalendarium" class="py-3 px-4 rounded-none text-foreground/80 font-medium hover:text-primary hover:bg-muted transition-colors {activeUrl === '/kalendarium' ? 'bg-muted text-primary font-bold' : ''}">Kalendarium</a>

							<div class="h-px bg-border my-4 mx-2"></div>
							<span class="px-4 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Träning</span>
							<a href="/traningspass" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm">Hur går träning till</a>
							<a href="/tider" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm border-t border-border/30">Träningstider</a>
							<a href="/avgifter" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm border-t border-border/30">Avgifter</a>
							<a href="/vardegrund" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm border-t border-border/30">Judons värdegrund</a>
							<a href="/gradering" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm border-t border-border/30">Gradering</a>
							<a href="/tavla" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm border-t border-border/30">Om tävling</a>
							<a href="/ordlista" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm border-t border-border/30">Japansk-Svensk ordlista</a>

							<div class="h-px bg-border my-4 mx-2"></div>
							<span class="px-4 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Medlemsinfo</span>
							<a href="/regler" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm">Ordningsregler</a>
							<a href="/judopass" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm border-t border-border/30">Judopass</a>
							<a href="/forsakring" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm border-t border-border/30">Försäkringsinformation</a>

							<div class="h-px bg-border my-4 mx-2"></div>
							<span class="px-4 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Om klubben</span>
							<a href="/styrelse" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm">Styrelse</a>
							<a href="/tranare" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm border-t border-border/30">Tränare</a>
							<a href="/historia" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm border-t border-border/30">Klubbens historia</a>
							<a href="/dokument" class="py-2.5 px-4 rounded-none text-foreground/70 hover:text-primary hover:bg-muted transition-colors text-sm border-t border-border/30">Dokument</a>

							<div class="h-px bg-border my-4 mx-2"></div>
							<a href="/kontakt" class="py-3 px-4 rounded-none text-foreground/80 font-medium hover:text-primary hover:bg-muted transition-colors">Kontakt</a>
						</div>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		</div>
	</header>

	<!-- Main Content Area -->
	<main class="flex-grow pt-28 md:pt-32 pb-20 px-6">
		<div class="max-w-3xl mx-auto w-full">
			{@render children?.()}
		</div>
	</main>

	<!-- Minimalist Footer with Sponsors -->
	<footer class="bg-background border-t border-border py-16 px-6">
		<div class="max-w-7xl mx-auto flex flex-col items-center">
			<span class="text-xs font-bold text-foreground/50 uppercase tracking-[0.2em] mb-10">Stolta Sponsorer</span>
			<div class="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
				<img src="/images/sponsor/Sjobo_logo.png" class="h-10 w-auto object-contain transition-transform hover:scale-105" alt="Sjöbo" />
				<img src="/images/sponsor/Sparbanken-skane-logo.png" class="h-10 w-auto object-contain transition-transform hover:scale-105" alt="Sparbanken Skåne" />
				<img src="/images/sponsor/rf_sisu.svg" class="h-12 w-auto object-contain transition-transform hover:scale-105" alt="RF-SISU" />
				<img src="/images/sponsor/Fritidskortet_Logo_RGB_hi-res.png" class="h-12 w-auto object-contain transition-transform hover:scale-105" alt="Fritidskortet" />
			</div>
			
			<div class="mt-20 pt-8 border-t border-border w-full flex flex-col md:flex-row justify-between items-center gap-4 text-foreground/60 text-sm">
				<p>© {new Date().getFullYear()} Österlen Budo. Alla rättigheter förbehållna.</p>
				<div class="flex gap-4">
					<a href="/kontakt" class="hover:text-primary transition-colors">Kontakt</a>
					<a href="/regler" class="hover:text-primary transition-colors">Regler</a>
				</div>
			</div>
		</div>
	</footer>
</div>
