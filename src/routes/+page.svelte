<script lang="ts">
    import { NewsItem} from '$lib/components/index'
    import { Heading, P, Button, Card } from 'flowbite-svelte';
    import logo  from '$lib/assets/logo_no_text.png'
    import pic_1 from '$lib/assets/logo.png'
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { title } from 'process';
	
    export let data
    console.log("DaTA", data)

</script>
<div class="text-center mt-28 flex items-center justify-center flex-col sm:col-span-2 md:col-span-4">
	<img src={logo} alt="Österlen Budo Logo" width="200px" class="mb-5"/>
	<p class="text-1xl font-thin md:text-2xl lg:text-2xl">
        <span class="bg-red-50 px-2">Välkommen till Österlen Budoklubb</span> </p
	>
	<P class="mb-6 text-sm dark:text-gray-400 sm:px-12  xl:px-28"
		>Den lilla klubben med det stora hjärtat.</P
	>
</div>
<div class="text-left flex flex-row justify-center flex-wrap sm:col-span-2 md:col-start-2 md:col-span-1 md:justify-end">
    {#each data.newsItems as news}
        <NewsItem title={news.title} pubDate={'2024-10-31'} image={news.image} slug={`nyheter/${news.slug}`} >
            {news.description}   
     </NewsItem>
    {/each}
    
    <NewsItem title="Klubbtävling" pubDate="2024-03-31" image='/images/tavling.jpeg' slug="">
        Idag har vi haft en klubbtävling med 20 duktiga deltagare varav det var mångas första gång.
    </NewsItem>
    <NewsItem title="Påsklovsträning" pubDate="2024-03-31" image='/images/easter.jpeg' slug="">
        Under påsklovet kan du komma och prova judo med oss. Inga förkunskaper krävs
    </NewsItem>
    <NewsItem title="Klubbtävling" pubDate="2024-03-31" image='/images/tavling.jpeg' slug="" >
        Idag har vi haft en klubbtävling med 20 duktiga deltagare varav det var mångas första gång.
    </NewsItem>
    <NewsItem title="Påsklovsträning" pubDate="2024-03-31" image='/images/easter.jpeg' slug="" >
        Under påsklovet kan du komma och prova judo med oss. Inga förkunskaper krävs
    </NewsItem>
</div>