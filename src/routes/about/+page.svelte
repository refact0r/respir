<script>
	import IconHouse from '~icons/ph/house-duotone';
	import IconLink from '~icons/ph/arrow-square-out-duotone';
</script>

<svelte:head>
	<title>respir: about</title>
	<meta name="description" content="information about the respir web app." />
</svelte:head>

<main>
	<div class="content">
		<div class="header">
			<a class="icon-button" href="/">
				<IconHouse style="font-size: 1.3rem;" />
			</a>
			<h1>about respir</h1>
			<a class="link" href="https://github.com/refact0r/respir">
				github repository
				<IconLink style="font-size: 1.3rem;" />
			</a>
		</div>
		<div class="box">
			<p>
				respir is designed to help people relax and calm down from stress in their lives through
				guided breathing exercises.
			</p>
			<p>
				created by shibest, refact0r, and ben-6 for the 2024 Interlake Programming Club Winter
				Hackathon.
			</p>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		flex: 1;
		flex-direction: column;

		@include flexCenter;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.link {
		text-decoration: none;
		color: var(--fg-1);
		padding: 1rem;
		border-radius: 2rem;
		background-color: var(--bg-2);
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 0.5rem;

		transition: background-color 0.2s ease-in-out;

		&:hover {
			background-color: var(--bg-3);
		}
	}

	.box {
		padding: 1rem 1.5rem;
		border-radius: 2rem;
		background-color: var(--bg-2);
		backdrop-filter: blur(6px);
	}
</style>
