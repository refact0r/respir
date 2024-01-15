<script>
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';

	let currentSize = 50;
	let growing = true;
	let circle;

	onMount(() => {
		const interval = setInterval(() => {
			console.log('switched');
			toggleSize();
		}, 8000);
	});

	$: {
		if (circle) {
			circle.style.scale = `${currentSize}%`;
		}
	}

	function toggleSize() {
		if (growing) {
			currentSize += 150;
			growing = false;
		} else {
			currentSize -= 150;
			growing = true;
		}
	}
</script>

<svelte:head>
	<title>Home - Zen Rhythm</title>
	<meta name="description" content="" />
</svelte:head>

<main>
	<h1>Relax Your Mind</h1>
	<p>Here at Zen Rhythm, breathe away stress and anxiety through our helpful breathing guide.</p>
	<div bind:this={circle} id="circle"></div>
</main>

<style lang="scss">
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#circle {
		position: fixed;
		top: 16rem;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: rgb(0, 106, 255); /* Initial color */
		transition: scale 8s;
	}
</style>
