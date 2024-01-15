<script>
	//import Icon from '$lib/images/fruitgame-icon.png';
</script>

<header>
	<a href="/" class="home" title="Home">
		<h1>Zen Rhythm</h1>
	</a>
	<div class="links">
		<a href="/" title="Home">Home</a>
		<a href="/breathe" title="Breathe">Breathe</a>
		<a href="/settings" title="Settings">Settings</a>
		<a href="/about" title="About">About</a>
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		align-items: stretch;
		background-color: rgb(123, 198, 228); //var(--accent);
		width: 100%;
		z-index: 10;
		position: fixed;
	}

	.home {
		display: flex;
		padding: 0.6rem 1.2rem;
		gap: 0.5rem;
		text-decoration: none;
		transition: 0.2s;
		color: rgb(51, 88, 101);

		&:hover {
			background-color: rgb(63, 148, 182);
		}
	}

	h1 {
		margin: 0;
		//font-family: 'Silkscreen';
		font-size: 1.6rem;
		line-height: 1.8rem - 0.2rem;
		margin-bottom: 0.2rem;
		color: rgb(51, 70, 101);
		//color: var(--text-0); //hsl(350, 80%, 50%);
	}

	.links {
		display: flex;
		margin-left: auto;
		align-items: stretch;
	}

	a {
		display: flex;
		align-items: center;
		text-decoration: none;
		font-weight: 500;
		font-size: 1.2rem;
		padding: 0 1rem;
		transition: 0.2s;
		color: rgb(51, 70, 101);
		//color: var(--text-0); //hsl(350, 80%, 50%);

		&:hover {
			background-color: rgb(63, 148, 182);
		}
	}
</style>
