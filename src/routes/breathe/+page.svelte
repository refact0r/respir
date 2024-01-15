<script>
	import IconPlay from '~icons/ph/play';
	import IconPause from '~icons/ph/pause';

	let exercise = {
		name: 'Box Breathing',
		description: '',
		cycles: 5,
		routine: [
			{
				name: 'breathe in',
				duration: 4,
				type: 'in'
			},
			{
				name: 'hold',
				duration: 4,
				type: 'hold'
			},
			{
				name: 'breathe out',
				duration: 4,
				type: 'out'
			},
			{
				name: 'hold',
				duration: 4,
				type: 'hold'
			}
		]
	};

	let play = false;
	let cycle = -1;
	let step = -1;
	let timer;

	let count = 0;
	let text = 'click to start';

	let circle;

	// when play/pause is clicked
	function togglePlay() {
		play = !play;
		if (cycle === -1) {
			cycle = 0;
			count = 3;
			text = 'get ready';
			timer = setInterval(tick, 1000);
			return;
		}
		if (play) {
			timer = setInterval(tick, 1000);
		} else {
			clearInterval(timer);
		}
	}
	// main event loop
	function tick() {
		count--;
		if (cycle === -1) {
			if (count === 0) {
				cycle++;
			}
			return;
		}
		if (count === 0) {
			circle.style.animation = 'none';
			circle.offsetHeight;
			circle.style.animation = null;
			if (step === exercise.routine.length - 1) {
				cycle++;
				step = 0;
			} else {
				step++;
			}
			count = exercise.routine[step].duration;
			text = exercise.routine[step].name;
		}
	}
</script>

<svelte:head>
	<title>Breathe</title>
	<meta name="description" content="" />
</svelte:head>

<head></head>

<main>
	<div class="middle">
		<div class="visualizer">
			<div class="circle" bind:this={circle}></div>
		</div>
		<div class="count">{cycle >= 0 ? cycle : ''}</div>
		<div class="count">{cycle >= 0 ? count : ''}</div>
		<div class="text">{text}</div>
	</div>
	<div class="bottom">
		<button on:click={togglePlay}>
			{#if play}
				<IconPause style="font-size: 1.6rem;" />
			{:else}
				<IconPlay style="font-size: 1.6rem;" />
			{/if}
		</button>
	</div>
</main>

<style lang="scss">
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.middle {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
	}

	.bottom {
		padding: 2rem;
	}

	.text {
		font-size: 2rem;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		border-radius: 50%;
		background: var(--bg-2);
	}

	.visualizer {
		width: 21rem;
		height: 1rem;
		background: var(--bg-2);
	}

	.circle {
		position: relative;
		left: 0;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: var(--txt);
		animation: 4s linear 1 breathe;
	}

	@keyframes breathe {
		0% {
			left: 0;
		}
		50% {
			left: 20rem;
		}
		100% {
			left: 0;
		}
	}
</style>
