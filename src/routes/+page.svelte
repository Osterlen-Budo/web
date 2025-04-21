<script lang="ts">
	import { NewsItem } from '$lib/components/index';
	import logo from '$lib/assets/logo_no_text.png';

	export let data;
	let children: any;
	// }
</script>

<!-- <div class="text-center mt-28 flex items-center justify-center flex-col sm:col-span-2 md:col-span-4">
	<img src={logo} alt="Österlen Budo Logo" width="200px" class="mb-5"/>
	<p class="text-1xl font-normal md:text-2xl lg:text-2xl ">
        <span class=" px-2">Välkommen till Österlen Budoklubb</span> </p
	>
	<p class="mb-6 text-xs md:text-sm dark:text-gray-400 text-red-700 sm:px-12  xl:px-28"
		>Den lilla klubben med det stora hjärtat</p>
</div> -->
<!-- svelte-ignore a11y-invalid-attribute -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

<!-- <div
			class="w-42 flex h-12 items-center justify-center border-2 border-gray-100 bg-slate-100 text-center sm:rounded-md"
		>
			<div class="text-md">Börja träna</div>
		</div>

		<div
			class="w-42 flex h-12 items-center justify-center border-2 border-gray-100 bg-slate-100 text-center sm:rounded-md"
		>
			<div class="text-md">Om klubben</div>
		</div>
		<div class="relative">
			<div
				on:click={() => setSelected('medlemsinfo')}
				class="w-42 z-10 flex h-12 items-center justify-center border-2 border-gray-100 bg-slate-100 text-center {selected ===
				'medlemsinfo'
					? 'shadow-xl'
					: ''} sm:rounded-md"
			>
				<div class="text-md">Medlemsinfo</div>
			</div>
			<div
				class="w-42 border-1 absolute z-0 col-span-8 {selected === 'medlemsinfo'
					? ''
					: 'hidden'} w-full bg-slate-100 shadow-2xl shadow-black"
			>
				<div class="border-2 border-slate-50 bg-slate-50 p-2 text-sm font-medium">
					Hur går träning till
				</div>
				<div class="bg-slate-5 border-2 border-slate-50 p-2 text-sm font-medium">
					Ordningsregler
				</div>
				<div class="bg-slate-5 border-2 border-slate-50 p-2 text-sm font-medium">Judopass</div>
				<div class="bg-slate-5 border-2 border-slate-50 p-2 text-sm font-medium">Försäkring</div>
			</div>
		</div>

		<div>
			<div
				class="w-42 flex h-12 items-center justify-center border-2 border-gray-100 bg-slate-100 text-center sm:rounded-md"
			>
				<div class="text-md">Träning</div>
			</div>
			<div class="w-42 z-0 col-span-8 hidden w-full border-2">
				<div class=" border-2 border-slate-50 bg-slate-50 p-2 text-sm font-medium">
					Hur går träning till
				</div>
				<div class="bg-slate-5 border-2 border-slate-50 p-2 text-sm font-medium">Träningstider</div>
				<div class="bg-slate-5 border-2 border-slate-50 p-2 text-sm font-medium">Avgifter</div>
				<div class="bg-slate-5 border-2 border-slate-50 p-2 text-sm font-medium">Träningstider</div>
				<div class="bg-slate-5 border-2 border-slate-50 p-2 text-sm font-medium">
					Judons värdegrund
				</div>
				<div class="bg-slate-5 border-2 border-slate-50 p-2 text-sm font-medium">Gradering</div>
				<div class="bg-slate-5 border-2 border-slate-50 p-2 text-sm font-medium">Om tävling</div>
			</div>
		</div> -->
<div class="text-blue mx-4 h-12 bg-sand pt-4 text-xl font-thin md:col-span-4">Våra grupper</div>
<!-- <img src="/\images/assets/barn_nyborjare.png" /> -->
<div class="col-span-2 flex flex-row flex-wrap justify-center gap-4 md:col-span-4">
	<div
		class="flex h-52 w-48 items-center justify-center rounded-md border-2 border-box bg-[url('/images/assets/barn_nyborjare.png')] bg-cover bg-no-repeat shadow-lg"
	>
		<div
			class="flex w-full items-center justify-center rounded-bl-2xl bg-red-accent bg-opacity-75 p-2"
		>
			<span class="text-center text-lg text-white">Barn Nybörjare<br />7-12 år</span>
		</div>
	</div>

	<div
		class="flex h-52 w-48 items-center justify-center rounded-md border-2 border-box bg-[url('/images/assets/barn_fortsattning.png')] bg-cover bg-no-repeat shadow-lg"
	>
		<div
			class="flex w-full items-center justify-center rounded-bl-2xl border-box bg-red-accent bg-opacity-75 p-2"
		>
			<span class="text-center text-lg text-white">Barn Forts.<br />7-12 år</span>
		</div>
	</div>

	<div
		class="flex h-52 w-48 items-center justify-center rounded-md border-2 border-box bg-[url('/images/assets/ungdomar.png')] bg-cover bg-no-repeat shadow-lg md:justify-center"
	>
		<div
			class="flex w-full items-center justify-center rounded-bl-2xl border-white bg-red-accent bg-opacity-75 p-2"
		>
			<span class="text-center text-lg text-white">Ungdomar<br />13-17 år</span>
		</div>
	</div>

	<div
		class="flex h-52 w-48 items-center justify-center rounded-md border-2 border-box bg-[url('/images/assets/vuxen1.png')] bg-cover bg-no-repeat shadow-lg"
	>
		<div
			class="flex w-full items-center justify-center rounded-bl-2xl border-white bg-red-accent bg-opacity-75 p-2"
		>
			<span class="text-center text-lg text-white">Vuxna<br />18+</span>
		</div>
	</div>
</div>

<div class="col-span-2 m-4 h-8 pt-4 text-xl font-thin md:col-span-4">Kalendarium</div>

<div class=" col-span-2 m-1 mx-4 flex h-52 justify-start rounded-lg bg-sand px-2 shadow-lg">
	<div class="p-2">
		<ul>
			<o><span class="text-sm">30 Nov:</span><span class="text-base">Läger</span> </o>
		</ul>
	</div>
</div>

<div class="col-span-2 m-4 h-8 pt-4 text-xl font-thin md:col-span-4">Kontakt</div>

<div class=" col-span-2 m-1 mx-4 flex h-52 justify-start rounded-lg bg-box px-2 shadow-lg">
	<div class="mx-w-xs p-2">info@osterlenbudo.se</div>
</div>

<!-- <div class="text-left flex flex-row justify-center flex-wrap sm:col-span-2 md:col-start-2 md:col-span-1 md:justify-normal"> -->
<!-- {#each data.newsItems as news}
        <NewsItem title={news.title} date={news.date} image={news.image || ""} slug={`nyheter/${news.slug}`} >
        </NewsItem>
    {/each} -->
<!-- <div class="fb-page" data-href="https://www.facebook.com/osterlenbudo" data-tabs="timeline" data-width="" data-height="" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true">
    <blockquote cite="https://www.facebook.com/osterlenbudo" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/osterlenbudo">Österlen Budo Klubb</a></blockquote></div>
 -->

<!--     
    <NewsItem title="Klubbtävling" pubDate="2024-03-31" image='/images/tavling.jpeg' slug="">
        Idag har vi haft en klubbtävling med 20 duktiga deltagare varav det var mångas första gång.
    </NewsItem>
    <NewsItem title="Påsklovsträning" pubDate="2024-03-31" image='/images/easter.jpeg' lug="">
        Under påsklovet kan du komma och prova judo med oss. Inga förkunskaper krävs
    </NewsItem>
    <NewsItem title="Klubbtävling" pubDate="2024-03-31" image='/images/tavling.jpeg' slug="" >
        Idag har vi haft en klubbtävling med 20 duktiga deltagare varav det var mångas första gång.
    </NewsItem>
    <NewsItem title="Påsklovsträning" pubDate="2024-03-31" image='/images/easter.jpeg' slug="" >
        Under påsklovet kan du komma och prova judo med oss. Inga förkunskaper krävs
    </NewsItem> -->
<!-- </div> -->
