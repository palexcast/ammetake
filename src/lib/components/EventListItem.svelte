<script lang="ts">
	import type { BabyEvent } from '../types/basic-event';
	import { EventType } from '../types/basic-event.js';
	import { getPottyIcon } from '../utils/common-utils.js';

	export let event: BabyEvent;
</script>

<div class="event">
	{#if event.eventType === EventType.Feeding}
		<pre><code>{JSON.stringify(event)}</code></pre>
	{/if}
	{#if event.eventType === EventType.Potty}
		<span>{getPottyIcon(event.type)}</span>
		<pre><code>{JSON.stringify(event)}</code></pre>
	{/if}
</div>

<style>
	.event {
		background: var(--background-color--dark);
		border-radius: 6px;
		padding: 0.25em;
	}
</style>
