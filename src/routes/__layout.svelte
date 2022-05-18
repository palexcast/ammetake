<script lang="ts">
	import '../app.css';
	import Auth from '$lib/components/Auth.svelte';
	import Footer from '../lib/components/Footer.svelte';
</script>

<Auth>
	<main>
		<slot />
	</main>

	<Footer />
</Auth>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
