<svelte:head>
	<title></title>
	<meta name="description" content="" />
</svelte:head>

<main>
	<h1>breath holding test</h1>
</main>

<style lang="scss">
	main {
		flex: 1;
		flex-direction: column;

		@include flexCenter;
		animation: fadeIn ease 2s;
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
