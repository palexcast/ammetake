<script lang="ts">
	import Line from 'svelte-chartjs/src/Line.svelte';
	import { events } from '../lib/stores/events';
	import { type BabyEvent, EventType } from '../lib/types/basic-event';
	import { Breast, type FeedingEvent } from '../lib/types/feeding-event';
	import type { LineData } from '../lib/types/chart';
	import { twoDigits } from '../lib/utils/common-utils';
	import { uniq } from '../lib/utils/array-utils';

	const formattedDate = (event: BabyEvent): string =>
		twoDigits(event.created.getDate()) + '.' + twoDigits(event.created.getMonth() + 1);

	const feedingData = (events: FeedingEvent[]): LineData => {
		const transformedData = events.map((e) => {
			const first = (e.stopped ? e.stopped.getTime() - e.created.getTime() : 0) / 60 / 1000;
			const second =
				(e.startedSecond && e.stoppedSecond
					? e.stoppedSecond.getTime() - e.startedSecond.getTime()
					: 0) /
				60 /
				1000;

			return {
				date: formattedDate(e),
				left: e.startedWith === Breast.Left ? first : second,
				right: e.startedWith === Breast.Right ? first : second,
				sum: first + second
			};
		});

		const labels = uniq(transformedData.map((e) => e.date));
		const datasets = [
			{
				label: 'Sum',
				data: [],
				fill: false,
				borderColor: 'rgb(255, 0, 0)',
				tension: 0.1
			},
			{
				label: 'Venstre',
				data: [],
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			},
			{
				label: 'Høyre',
				data: [],
				fill: false,
				borderColor: 'rgb(0,0,0)',
				tension: 0.1
			}
		];
		labels.forEach((label) => {
			const data = transformedData.filter((e) => e.date === label);
			datasets[0].data.push(data.reduce((a, b) => a + b.sum, 0));
			datasets[1].data.push(data.reduce((a, b) => a + b.left, 0));
			datasets[2].data.push(data.reduce((a, b) => a + b.right, 0));
		});
		return {
			labels,
			datasets
		};
	};

	$: allEvents = events.all;
	$: feedingEvent = feedingData(
		$allEvents?.filter((event: BabyEvent) => event.eventType === EventType.Feeding)
	);
	$: pottyEvent = $allEvents?.filter((event) => event.type === EventType.Potty);
</script>

<svelte:head>
	<title>Ammetåke - Dagbok</title>
	<meta name="description" content="Ammetåke - Dagbok" />
</svelte:head>

<div class="feeding-chart">
	<Line data={feedingEvent} />
</div>

<style>
	.feeding-chart {
		background-color: rgba(255, 255, 255, 0.75);
		padding: 1em;
		border-radius: 4px;
	}
</style>
