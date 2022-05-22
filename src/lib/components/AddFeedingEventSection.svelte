<script lang="ts">
	import { feeding } from '../stores/feeding';
	import { Breast, type FeedingEvent } from '../types/feeding-event';
	import { formatTimeHM, isNil, lessThanFrom, oppositeBreast } from '../utils/common-utils';
	import Timer from './Timer.svelte';
	import { breastTranslated } from '../utils/common-utils.js';
	import { TIME_TO_NEXT_FEEDING } from '../../settings';
	import { EventType } from '../types/basic-event';

	const enable = (previous: FeedingEvent, type: Breast): boolean => {
		if (isNil(previous)) {
			return true;
		}
		if (isNil(previous.stopped)) {
			return previous.startedWith !== type;
		}
		if (!isNil(previous.startedSecond) && isNil(previous.stoppedSecond)) {
			return previous.startedWith === type;
		}
		return true;
	};

	const getActiveStartDate = (previous: FeedingEvent): Date | null => {
		if (isNil(previous)) {
			return null;
		}
		if (!isNil(previous.created) && isNil(previous.stopped)) {
			return previous.created;
		}
		if (!isNil(previous.startedSecond) && isNil(previous.stoppedSecond)) {
			return previous.startedSecond;
		}
	};

	const getActiveStartBreast = (previous: FeedingEvent): Breast => {
		if (isNil(previous)) {
			return null;
		}
		if (!isNil(previous.created) && isNil(previous.stopped)) {
			return previous.startedWith;
		}
		if (!isNil(previous.startedSecond) && isNil(previous.stoppedSecond)) {
			return oppositeBreast(previous.startedWith);
		}
	};

	const nextTime = (previous: FeedingEvent): string => {
		return formatTimeHM(new Date(previous.created.getTime() + TIME_TO_NEXT_FEEDING));
	};

	$: food = feeding.all;
	$: previous = feeding.previous;
	$: enableLeft = enable($previous, Breast.Left);
	$: enableRight = enable($previous, Breast.Right);
	$: activeStart = getActiveStartDate($previous);
	$: activeBreast = getActiveStartBreast($previous);

	const start = async (type: Breast, previous: FeedingEvent | null): Promise<void> => {
		let event: FeedingEvent;
		if (
			!isNil(previous) &&
			previous.startedWith !== type &&
			!previous.stoppedSecond &&
			lessThanFrom(previous.created, 15)
		) {
			event = previous;
			event.stopped = new Date();
			event.startedSecond = event.stopped;
			await feeding.update(event);
			return;
		}
		event = {
			startedWith: type,
			created: new Date(),
			eventType: EventType.Feeding
		};
		await feeding.add(event);
	};

	const stop = async (event: FeedingEvent): Promise<void> => {
		if (event.stopped && !event.stoppedSecond) {
			event.stoppedSecond = new Date();
		} else if (!event.stopped) {
			event.stopped = new Date();
		}
		await feeding.update(event);
	};
</script>

<div class="wrapper">
	{#if $previous}
		<div class="details">
			<span class="next">
				Neste amming er kl {nextTime($previous)} på
				{breastTranslated(oppositeBreast($previous.startedWith))} bryst.
			</span>
			<span>
				Tid siden siste ammestart
				<Timer start={$previous.created} />
				på {breastTranslated($previous.startedWith)} bryst.
			</span>
		</div>
	{/if}

	{#if activeStart}
		<div class="active-feeding">
			<span>
				Pågående amming på {breastTranslated(activeBreast)}: <Timer start={activeStart} />
			</span>
		</div>
	{/if}
	<div class="start-stop-buttons">
		{#if enableLeft}
			<button class="start" on:click={() => start(Breast.Left, $previous)}>Start Venstre</button>
		{:else}
			<button class="stop" on:click={() => stop($previous)}>Stopp Venstre</button>
		{/if}
		{#if enableRight}
			<button class="start" on:click={() => start(Breast.Right, $previous)}>Start Høyre</button>
		{:else}
			<button class="stop" on:click={() => stop($previous)}>Stopp Høyre</button>
		{/if}
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
	}

	.details {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5em;

		.next {
			font-size: 1.25em;
		}
	}

	.active-feeding {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	.start-stop-buttons {
		display: flex;
		gap: 1em;
	}

	button {
		padding: 0.5em;
		border-radius: 5px;
		border: 0;

		&:hover {
			filter: brightness(0.85);
			cursor: pointer;
		}

		&.start {
			background-color: var(--primary-color);
		}
		&.stop {
			background-color: var(--secondary-color);
		}
	}
</style>
