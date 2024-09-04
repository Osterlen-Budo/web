<script lang="ts">
    import { NewsItem} from '$lib/components/index'
    import logo  from '$lib/assets/logo_no_text.png'
	
    export let data
    console.log("DaTA", data)

</script>
<div class="text-center mt-28 flex items-center justify-center flex-col sm:col-span-2 md:col-span-4">
	<img src={logo} alt="Österlen Budo Logo" width="200px" class="mb-5"/>
	<p class="text-1xl font-normal md:text-2xl lg:text-2xl ">
        <span class=" px-2">Välkommen till Österlen Budoklubb</span> </p
	>
	<p class="mb-6 text-xs md:text-sm dark:text-gray-400 text-red-700 sm:px-12  xl:px-28"
		>Den lilla klubben med det stora hjärtat</p>
</div>
<div class="text-left flex flex-row justify-center flex-wrap sm:col-span-2 md:col-start-2 md:col-span-1 md:justify-normal">
    {#each data.newsItems as news}
        <NewsItem title={news.title} date={news.date} image={news.image || ""} slug={`nyheter/${news.slug}`} >
        </NewsItem>
    {/each}
    <!-- <div class="fb-page" data-href="https://www.facebook.com/osterlenbudo" data-tabs="timeline" data-width="" data-height="" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true">
    <blockquote cite="https://www.facebook.com/osterlenbudo" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/osterlenbudo">Österlen Budo Klubb</a></blockquote></div>
 -->

    <!--     
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
    </NewsItem> -->
</div>
