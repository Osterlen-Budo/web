<script lang="ts">
	import terminData from '../../pages/termin.json';

	function formatSwedishDate(dateStr?: string) {
		if (!dateStr) return '';
		try {
			const d = new Date(dateStr);
			return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
		} catch {
			return dateStr || '';
		}
	}

	const termName = terminData?.name || 'Aktuell termin';
	const intakeEndFormatted = formatSwedishDate(terminData?.intakeEndDate);
	const startFormatted = formatSwedishDate(terminData?.startDate);

	// Check if intake is currently open based on current date
	const isClosed = $derived.by(() => {
		if (!terminData?.intakeEndDate) return false;
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const deadline = new Date(terminData.intakeEndDate);
		deadline.setHours(23, 59, 59, 999);
		return today > deadline;
	});
</script>

<div class="my-6 not-prose">
	{#if isClosed}
		<div class="bg-muted/40 border-l-4 border-foreground/40 p-5">
			<div class="flex items-center gap-2 mb-1">
				<span class="inline-block w-2.5 h-2.5 rounded-full bg-foreground/40"></span>
				<h3 class="text-sm font-bold uppercase tracking-wider text-foreground">Intag stängt för {termName}</h3>
			</div>
			<p class="text-xs text-foreground/70 leading-relaxed">
				Intaget av nya medlemmar för denna termin stängde den <strong>{intakeEndFormatted}</strong>.
				Varmt välkommen att börja träna med oss vid nästa terminsstart! Håll utkik i vårt <a href="/kalendarium" class="text-primary underline">kalendarium</a> för datum.
			</p>
		</div>
	{:else}
		<div class="bg-primary/5 border-l-4 border-primary p-5">
			<div class="flex items-center gap-2 mb-1">
				<span class="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
				<h3 class="text-sm font-bold uppercase tracking-wider text-primary">Intag öppet – {termName}</h3>
			</div>
			<p class="text-xs text-foreground/80 leading-relaxed">
				Vi tar emot nya medlemmar från terminsstart{#if startFormatted} ({startFormatted}){/if} fram till och med <strong>{intakeEndFormatted}</strong>.
				Du behöver inte föranmäla dig – kom bara till dojon under passet för din åldersgrupp!
			</p>
		</div>
	{/if}
</div>
