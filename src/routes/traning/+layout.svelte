<script lang="ts">
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>


<div class="flex flex-col items-center justify-center">
    <div class="page p-10">
    {@render children?.()}
</div>
</div>
