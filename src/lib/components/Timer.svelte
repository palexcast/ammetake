<script lang="ts">
	import { readable } from 'svelte/store';
	import { twoDigits } from '../utils/common-utils.js';

	export let start: Date | null;

	const mstime = readable(new Date().getTime(), (set) => {
		let animationFrame;
		const next = () => {
			set(new Date().getTime());
			animationFrame = requestAnimationFrame(next);
		};
		if (window.requestAnimationFrame) {
			next();
			return () => cancelAnimationFrame(animationFrame);
		}
	});

	$: timeDiff = Math.floor(($mstime - start?.getTime() ?? $mstime) / 1000);
	$: hours = Math.floor(timeDiff / 60 / 60);
	$: minutes = Math.floor(timeDiff / 60 - hours * 60);
	$: seconds = timeDiff - hours * 60 * 60 - minutes * 60;
</script>

{twoDigits(hours)}:{twoDigits(minutes)}:{twoDigits(seconds)}
