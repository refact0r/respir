<script>
	import IconAir from '~icons/ph/wind-duotone';
</script>

<svelte:head>
	<title>Home - Zen Rhythm</title>
	<meta name="description" content="" />
</svelte:head>

<main>
	<div class="top">
		<h1>respir <span class="text-icon"><IconAir /></span></h1>

		<p class="description">breathing exercises to help you relax, focus, or sleep.</p>
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
</style>
