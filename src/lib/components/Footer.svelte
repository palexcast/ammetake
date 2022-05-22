<script lang="ts">
	import { page } from '$app/stores';
	import { auth } from '../stores/auth';
</script>

<nav>
	<ul>
		<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Hjem</a></li>
		<li class:active={$page.url.pathname === '/dagbok'}>
			<a sveltekit:prefetch href="/dagbok">Dagbok</a>
		</li>
		<li class:active={$page.url.pathname === '/logg-ut'}>
			<button on:click={() => auth.signOut()}>Logg ut</button>
		</li>
	</ul>
</nav>

<style lang="scss">
	nav {
		height: 3rem;
	}

	ul {
		display: flex;
		flex-grow: 1;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background-color--dark);
		height: 100%;
		margin: 0;
		padding: 0;
	}

	li {
		height: 100%;
		font-size: 1.25em;
		flex-grow: 1;
		position: relative;

		&:hover {
			background: var(--secondary-color);
			cursor: pointer;
		}

		&.active:after {
			bottom: 0;
			background: var(--primary-color);
			content: '';
			width: 100%;
			height: 0.25em;
			position: absolute;
		}
	}

	button,
	a {
		color: var(--primary-font-color);
		background: none;
		border: none;
		text-decoration: none;
		font-weight: 900;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
