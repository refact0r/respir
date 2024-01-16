<script>
	import IconAir from '~icons/ph/wind-duotone';
</script>

<svelte:head>
	<title>home - respir</title>
	<meta name="description" content="" />
</svelte:head>

<main>
	<div class="top">
		<h1>respir <span class="text-icon"><IconAir /></span></h1>

		<p class="description">breathing exercises to help you relax, focus, or sleep.</p>
		<br />
		<a class="start-button" href="/breathe" title="Get Started"><span>Get Started</span></a>
	</div>
</main>

<style lang="scss">
	main {
		flex: 1;
		flex-direction: column;

		@include flexCenter;
	}

	h1 {
		font-size: 2.5rem;
		margin: 1rem 0;
	}

	.description {
		font-size: 1.2rem;
		margin: 1rem 0;
	}

	.start-button {
		padding: 1rem;
		background-color: hsla(208, 100%, 97%, 0.6);
		border-radius: 0.5rem;
		text-decoration: none;
		color: rgb(18, 29, 27);
		cursor: pointer;
		transition: 0.25s;
	}

	.start-button span {
		cursor: pointer;
		transition: 0.5s;
		margin-right: -0.5rem;
	}

	.start-button span:after {
		content: '▶';
		position: relative;
		opacity: 0;
		right: 0.5rem;
		margin-right: -0.25rem;
		transition: 0.5s;
	}

	.start-button:hover span {
		padding-right: 25px;
	}

	.start-button:hover span:after {
		opacity: 1;
		right: -0.5rem;
		position: relative;
	}

	.start-button:hover {
		background-color: hsla(0, 0%, 100%, 0.8);
	}
</style>
