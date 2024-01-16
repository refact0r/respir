<script>
	import IconHouse from '~icons/ph/house-duotone';
</script>

<svelte:head>
	<title>respir: about</title>
	<meta name="description" content="" />
</svelte:head>

<main>
	<h1>about respir</h1>
	<p>
		respir is designed to help people relax and calm down from stress in their lives through guided
		breathing exercises.
	</p>
	<p>
		this web app was created by shibest, refact0r, and ben-6 for the 2024 Interlake Programming Club
		Winter Hackathon.
	</p>
	<br />
	<a class="icon-button" href="/">
		<IconHouse style="font-size: 1.3rem;" />
	</a>
</main>

<style lang="scss">
	main {
		flex: 1;
		flex-direction: column;

		@include flexCenter;
	}
</style>
