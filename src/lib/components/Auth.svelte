<script lang="ts">
    import {auth} from '../stores/auth';

    let email: string;
    let password: string;

    const login = () => {
        console.log('login')
        auth.signIn(email, password);
    }
</script>

{#if $auth === undefined}
    <div class="centered"><p>Checking auth status &hellip;</p></div>
{:else if $auth === null}
    <div class="centered">
        <form class="sign-in" on:submit|preventDefault={login}>
            <input type="text" placeholder="Email" bind:value={email}/>
            <input type="password" placeholder="Password" bind:value={password}/>
            <button type="submit">Sign In</button>
        </form>
    </div>
{:else}
    <slot/>
    <!--<button on:click={() => auth.signOut()}>Sign Out</button>{$auth.displayName} ({$auth.email})-->
{/if}

<style>
    .centered {
        display: flex;
        justify-content: center;
        align-content: center;
        height: 100vh;
    }

    .sign-in {
        max-width: 20rem;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }

    input {
        padding: 0.25em;
        margin: 0.25em 0;
    }

    button {
        margin-top: 0.5rem;
        border: none;
        border-radius: 4px;
        color: var(--pure-white);
        background-color: var(--secondary-color);
        cursor: pointer;
        padding: 0.5em 0;
    }
</style>
