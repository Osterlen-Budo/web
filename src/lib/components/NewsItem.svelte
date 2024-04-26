<script lang="ts">
	import { formatDate } from '$lib/utils'
    import { goto } from '$app/navigation';

    export let title: string
    export let pubDate: string
    export let image: string
    export let slug: string
	// logic goes here
</script>


 <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
 <div  on:keyup={(e)=>goto(slug)} role="navigation" on:click={(e)=>goto(slug)}  class="mx-1 my-5 bg-white sm:mx-2 border rounded-md overflow-clip w-auto sm:max-w-80 md:max-w-80 cursor-pointer" >
        <div class="p-5">
            <h5 class="mb-2 text-xl font-bold  tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p class="text-xs font-thin text-grey-50">{formatDate(pubDate)}</p>
        </div>
        <div class="h-80 overflow-clip border-y">
            <img class="object-cover p-1 bg-red-50" src={image} alt="Judo klubbtävling" />
        </div>
            <!-- <div class="p-5">
                <p class="font-thin text-normal text-gray-700 dark:text-gray-400 leading-tight"><slot /> </p>
                <Button class="mt-5" on:click={(e)=>goto(slug)}>
                    Läs mer<ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
                </Button>  
            </div> -->
</div>

