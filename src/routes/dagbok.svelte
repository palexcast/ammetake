<script lang="ts">
	import { events } from '../lib/stores/events';
	import EventListItem from '../lib/components/EventListItem.svelte';

	$: allEvents = events.all;
</script>

<svelte:head>
	<title>Ammetåke - Dagbok</title>
	<meta name="description" content="Ammetåke - Dagbok" />
</svelte:head>

<div>
	{#each $allEvents as event}
		<EventListItem {event} />
	{/each}
</div>
