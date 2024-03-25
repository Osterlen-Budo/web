<script lang="ts">
	import { formatDate } from '$lib/utils'

	export let data
</script>

<div class="mt-20">
    <svelte:component this={data.content} />
</div>