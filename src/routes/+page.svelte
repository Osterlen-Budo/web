<script lang="ts">
    import { NewsItem} from '$lib/components/index'
    import { Heading, P, Button, Card } from 'flowbite-svelte';
    import logo  from '$lib/assets/logo_no_text.png'
    import pic_1 from '$lib/assets/logo.png'
    import easter from '$lib/assets/easter.jpeg'
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { title } from 'process';
	
    export let data
    console.log("DaTA", data)
</script>
<div class="text-center h-screen flex items-center justify-center flex-col mt-28">
	<img src={logo} alt="Österlen Budo Logo" width="200px" class="mb-5"/>
	<p class="text-1xl font-thin	  md:text-2xl lg:text-2xl">
        <span class="bg-red-50 px-2">Välkommen till Österlen Budo Klubb</span> </p
	>
	<P class="mb-6 text-sm dark:text-gray-400 sm:px-12  xl:px-28"
		>Den lilla klubben med det stora hjärtat.</P
	>
    <div class="text-left flex flex-row items-start justify-start max-w-4xl">
        <div class="flex flex-row">
        
        <NewsItem title="Klubbtävling" pubDate="2024-03-31" image='/images/tavling.jpeg' >
            Idag har vi haft en klubbtävling med 20 duktiga deltagare varav det var mångas första gång.
        </NewsItem>

        <div  class="m-5 min-w-80  border rounded-md overflow-clip">
            <div class="p-5">
                <h5 class="mb-2 text-xl font-bold  tracking-tight text-gray-900 dark:text-white">Påsklovsträning</h5>
                <p class="text-xs font-thin text-grey-50">2024-03-23</p>
            </div>
            <div class="h-80 overflow-clip border">
                <img class="h-80 object-cover object-left-top" src={easter} alt="Judo Påskträning" />
            </div>
            <div class="p-5">
                <p class="font-thin text-normal text-gray-700 dark:text-gray-400 leading-tight">Under påsklovet kan du komma och prova judo med oss. Inga förkunskaper krävs</p>
                <Button class="mt-5">
                    Läs mer<ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
                </Button>  
            </div>
        </div>
    </div>
        
    <div>
        <Card href="" size="xs" class="m-5" >
            <h5 class="mb-2 text-2xl font-thin	 tracking-tight text-gray-900 dark:text-white">Börja Träna</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </Card>
        <Card href="" size="xs" class="m-5" >
            <h5 class="mb-2 text-2xl font-thin	 tracking-tight text-gray-900 dark:text-white">På gång</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </Card>
    </div>

    </div>
</div>
