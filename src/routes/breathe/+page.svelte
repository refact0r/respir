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
	let cycle = 0;
	let step = 0;
	let text = 'click to start';
	let timer;

	function togglePlay() {
		play = !play;
		if (cycle === 0) {
			start();
			return;
		}
		if (play) {
			timer = setTimeout(next, exercise.routine[step].duration * 1000);
		} else {
			clearTimeout(timer);
		}
	}

	function start() {
		cycle = 1;
		step = 0;
		text = exercise.routine[step].name;
		timer = setTimeout(next, exercise.routine[step].duration * 1000);
	}

	function next() {
		step++;
		if (step === exercise.routine.length) {
			step = 0;
			cycle++;
		}
		if (cycle === exercise.cycles + 1) {
			cycle = 0;
			play = false;
			text = 'click to start';
			return;
		}
		text = exercise.routine[step].name;
		timer = setTimeout(next, exercise.routine[step].duration * 1000);
	}
</script>

<svelte:head>
	<title>Breathe</title>
	<meta name="description" content="" />
</svelte:head>

<head></head>

<main>
	<div class="middle">
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
</style>
