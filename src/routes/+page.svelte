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


<div class=" m-5 flex w-screen mb-10 flex-wrap justify-center overflow-y-visible">
    <div class="border-8 border-white bg-gray-50  px-2  h-52 rounded-lg m-4 bg-red-100 flex justify-center shadow-lg   ">
        <div class="w-52">
            <span class="text-xl text-black">Börja Träna</span>
        </div>
    </div>
    
    <div>
        <div class="border-8 border-white bg-gray-50 h-24 w-24 rounded-lg px-2 mb-4  my-4  shadow-lg ">
            <div class="">
                <span class="text-sm ">Träningstider</span>
            </div>
            
        </div>

        <div class="border-8 border-white   bg-gray-50 w-24 h-24 px-2 my-4  rounded-lg shadow-lg ">
            <div class="">
                <span class="text-sm">Kalender</span>
            </div>
        </div>
    </div>

    <div class="border-8 border-white bg-gray-50 w-52 h-24   rounded-lg px-2  m-4 shadow-lg  ">
        <span class="text-xl">Börja träna</span>
    </div>

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
    <NewsItem title="Påsklovsträning" pubDate="2024-03-31" image='/images/easter.jpeg' lug="">
        Under påsklovet kan du komma och prova judo med oss. Inga förkunskaper krävs
    </NewsItem>
    <NewsItem title="Klubbtävling" pubDate="2024-03-31" image='/images/tavling.jpeg' slug="" >
        Idag har vi haft en klubbtävling med 20 duktiga deltagare varav det var mångas första gång.
    </NewsItem>
    <NewsItem title="Påsklovsträning" pubDate="2024-03-31" image='/images/easter.jpeg' slug="" >
        Under påsklovet kan du komma och prova judo med oss. Inga förkunskaper krävs
    </NewsItem> -->
</div>
