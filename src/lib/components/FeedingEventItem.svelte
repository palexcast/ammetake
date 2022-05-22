<script lang="ts">
	import { FeedingEvent } from '../types/feeding-event';

	export let event: FeedingEvent;

	const toTime = (date: Date): string => {
		if (!date) return '';
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const ampm = hours >= 12 ? 'pm' : 'am';
		const hours12 = hours % 12;
		return `${hours12}:${minutes} ${ampm}`;
	};
</script>

<div>
	<span
		>Started with {event.startedWith}
		{toTime(event.created)}{event.stopped ? ' is stopped' : ''}</span
	>
	{#if event.startedSecond}<span
			>Second started {toTime(event.startedSecond)}{event.stoppedSecond ? ' is stopped' : ''}</span
		>{/if}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}
</style>
