<script lang="ts">
	import { NewsItem } from '$lib/components/index';
	import logo from '$lib/assets/logo_no_text.png';

	let { data } = $props();
	let children: any;
	// }
</script>

<div class="text-blue col-span-2 mx-4 h-12 bg-sand pt-4 text-xl font-thin md:col-span-4">
	Våra grupper
</div>
<!-- <img src="/\images/assets/barn_nyborjare.png" /> -->
<div class="col-span-2 flex flex-row overflow-auto md:col-span-4 md:justify-center">
	<div
		class="ml-8 flex h-52 w-1/4 min-w-32 max-w-48 items-center justify-center rounded-md border-2 border-box bg-[url('/images/assets/barn_nyborjare.png')] bg-cover bg-no-repeat shadow-lg"
	>
		<div
			class="flex w-full items-center justify-center rounded-bl-2xl bg-red-accent bg-opacity-75 p-2"
		>
			<span class="text-center text-lg text-white">Barn Nybörjare<br />7-12 år</span>
		</div>
	</div>

	<div
		class="ml-4 flex h-52 w-1/4 min-w-32 max-w-48 items-center justify-center rounded-md border-2 border-box bg-[url('/images/assets/barn_fortsattning.png')] bg-cover bg-no-repeat shadow-lg"
	>
		<div
			class="flex w-full items-center justify-center rounded-bl-2xl border-box bg-red-accent bg-opacity-75 p-2"
		>
			<span class="text-center text-lg text-white">Barn Forts.<br />7-12 år</span>
		</div>
	</div>

	<div
		class="ml-4 flex h-52 w-1/4 min-w-32 max-w-48 items-center justify-center rounded-md border-2 border-box bg-[url('/images/assets/ungdomar.png')] bg-cover bg-no-repeat shadow-lg md:justify-center"
	>
		<div
			class="flex w-full items-center justify-center rounded-bl-2xl border-white bg-red-accent bg-opacity-75 p-2"
		>
			<span class="text-center text-lg text-white">Ungdomar<br />13-17 år</span>
		</div>
	</div>

	<div
		class="ml-4 mr-8 flex h-52 w-1/4 min-w-32 max-w-48 items-center justify-center rounded-md border-2 border-box bg-[url('/images/assets/vuxen1.png')] bg-cover bg-no-repeat shadow-lg"
	>
		<div
			class="flex w-full items-center justify-center rounded-bl-2xl border-white bg-red-accent bg-opacity-75 p-2"
		>
			<span class="text-center text-lg text-white">Vuxna<br />18+</span>
		</div>
	</div>
</div>

<div class=" col-span-2 m-10 mx-4 h-52 flex-col justify-start rounded-md bg-box px-2 shadow-sm">
	<div class="text-blue m-2 text-xl font-thin">Kalendarium</div>

	<div class="p-2">
		<ul>
			<o><span class="text-sm">30 Nov:</span><span class="text-base">Läger</span> </o>
		</ul>
	</div>
</div>
<div></div>
<div
	class="col-span-2 row-span-1 mx-4 h-auto flex-col justify-end rounded-md bg-box px-2 shadow-sm md:row-span-2 lg:col-span-1"
>
	<div class=" mt-2 text-xl font-thin">Sponsorer</div>

	<div class="mx-w-xs flex-col justify-items-center p-6">
		<img src="/images/sponsor/Sjobo_logo.png" alt="Sjöbo Kommun" class=" max-h-20" />
		<img src="/images/sponsor/Sparbanken-skane-logo.png" alt="Sjöbo Kommun" class="mt-4 max-h-20" />
		<img src="/images/sponsor/rf_sisu.svg" alt="Sjöbo Kommun" class="mt-4 max-h-20" />
		<img src="/images/sponsor/sjobo_elnat.png" alt="Sjöbo Kommun" class="mt-4 max-h-20" />
	</div>
</div>
<div
	class=" col-span-2 m-10 mx-4 h-52 flex-col justify-start rounded-md bg-box px-2 shadow-sm md:col-span-2"
>
	<div class="m-2 text-xl font-thin">Kontakt</div>

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
