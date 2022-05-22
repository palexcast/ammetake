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
		margin: 0 auto;
		max-width: 768px;
		box-sizing: border-box;
	}
</style>
