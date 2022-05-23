<script lang="ts">
	import { auth } from '$lib/stores/auth';
</script>

<button class="button__primary" on:click={() => auth.signOut()}>Logg ut</button>
