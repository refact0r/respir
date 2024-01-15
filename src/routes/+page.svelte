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
			circle.style.width = `${currentSize}px`;
			circle.style.height = `${currentSize}px`;
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
	<title>Zen Rhythm</title>
	<meta name="description" content="" />
</svelte:head>

<section>
	<h1>hello world</h1>
	<div bind:this={circle} id="circle"></div>
</section>

<style lang="scss">
	#circle {
		border-radius: 50%;
		background-color: rgb(0, 106, 255); /* Initial color */
		transition:
			width 8s,
			height 8s; /* Add a transition for smoother size changes */
	}
</style>
