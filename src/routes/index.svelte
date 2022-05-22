<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import AddFeedingEventSection from '../lib/components/AddFeedingEventSection.svelte';
	import AddPottyEventSection from '../lib/components/AddPottyEventSection.svelte';
</script>

<svelte:head>
	<meta name="description" content="Ammetåke" />
</svelte:head>

<section>
	<div class="feeding">
		<AddFeedingEventSection />
	</div>
	<div class="potty">
		<AddPottyEventSection />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.feeding,
	.potty {
		margin: 1em 0;
	}
</style>
