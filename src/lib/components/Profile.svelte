<script lang="ts">
import { fade, fly } from 'svelte/transition';

    export let name: string
    export let title: string
    export let image: string
    export let gif: string
    export let belt: string = ""


    
    let randomGif = gif === 'random' ? true : false
    let showGif = false;
  
    function randomInteger(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
        }


    function getTrans() {
        const trans  = [
        {x: 100},
        {x: -100},
        {y: 100}
    ]

    return trans[randomInteger(0,2)]
    
    }

  
	// logic goes here
</script>


 <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
 <div class="group w-56 h-80 rounded-xl relative  bg-slate-100   mb-10 overflow-hidden mx-2">
        <div class="overflow-clip  relative justify-cente" >
            {#if showGif && gif != ''}
                <img transition:fade={{duration: 800}} class="align-bottom  w-full h-full absolute "  src={gif}  alt={title} />
            {/if}
         

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            {#if !showGif}
                <img 
                    transition:fly={{duration: 1600, ...getTrans()}} 
                    on:click={() => {
                        if(gif){
                            gif = randomGif ? `images/gif/${randomInteger(1, 3)}.gif` : gif
                            showGif=true; 
                            setTimeout( () => {
                                showGif = false
                            }, 1600);
                        }
                    }
                    } 
                    class=""  
                    src={image} 
                    height="172" 
                    alt={title} />
                
                {/if}

        </div>
        <div class=" text-center h-full bg-white py-3">
            <p class="font-bold  tracking-tight text-gray-900 dark:text-white">{name}</p>
            <p class="-xs font-thin text-grey-50">{title}</p>
            {#if belt}
                <p class="-xs font-thin text-grey-50">{belt}</p>
            {/if}
        </div>
</div>

