<script lang="ts">
	import { potty } from '../stores/potty';
	import { type PottyEvent, PottyType } from '../types/potty-event';
	import { EventType } from '../types/basic-event';
	import { feeding } from '../stores/feeding';
	import Timer from './Timer.svelte';

	const add = async (type: PottyType): Promise<void> => {
		let event: PottyEvent = {
			type,
			created: new Date(),
			eventType: EventType.Potty
		};
		await potty.add(event);
	};

	const getIcon = (type: PottyType): string => {
		switch (type) {
			case PottyType.POOP:
				return '💩';
			case PottyType.PEE:
				return '💦';
			case PottyType.BOTH:
				return '💩💦';
		}
	};

	$: previous = potty.previous;
</script>

<div class="wrapper">
	{#if $previous}
		<span>
			Tid siden sist bleieskift ({getIcon($previous.type)}) <Timer start={$previous.created} />
		</span>
	{/if}

	<div class="buttons">
		<button on:click={() => add(PottyType.PEE)}>💦</button>
		<button on:click={() => add(PottyType.POOP)}>💩</button>
		<button on:click={() => add(PottyType.BOTH)}>💩💦</button>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
	}
	.buttons {
		display: flex;
		align-items: center;
		gap: 1em;
	}

	button {
		background-color: var(--primary-color);
		padding: 0.5em;
		border-radius: 5px;
		border: 0;

		&:hover {
			filter: brightness(0.85);
			cursor: pointer;
		}
	}
</style>
