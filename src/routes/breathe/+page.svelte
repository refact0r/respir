<script>
	import IconPlay from '~icons/ph/play';
	import IconPause from '~icons/ph/pause';

	let inWav, outWav, holdWav, forestWav;

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
	let cycle = -2;
	let step = 0;
	let timer;

	let count = 0;
	let text = 'click to start';

	let circle;

	// when play/pause is clicked
	function togglePlay() {
		play = !play;
		// initial start
		if (cycle === -2) {
			cycle = -1;
			count = 3;
			text = 'get ready';
			timer = window.requestAnimationFrame(firstFrame);
			return;
		}
		if (play) {
			timer = window.requestAnimationFrame(firstFrame);
		} else {
			window.cancelAnimationFrame(timer);
		}
	}

	let startTime, prevSec, prevStep;

	// initialize start time
	function firstFrame(time) {
		startTime = time;
		prevSec = time;
		prevStep = time;
		frame(time);
	}

	// main event loop
	function frame(time) {
		// animate stuff
		const elapsedStep = time - prevStep;
		if (cycle >= 0) {
			const stepDuration = exercise.routine[step].duration;
			const fraction = elapsedStep / 1000 / stepDuration;
			if (step === 0) {
				circle.style.left = `0rem`;
				circle.style.bottom = `${fraction * 10}rem`;
			} else if (step === 1) {
				circle.style.left = `${fraction * 10}rem`;
				circle.style.bottom = `10rem`;
			} else if (step === 2) {
				circle.style.left = `10rem`;
				circle.style.bottom = `${10 - fraction * 10}rem`;
			} else if (step === 3) {
				circle.style.left = `${10 - fraction * 10}rem`;
				circle.style.bottom = `0rem`;
			}
		}

		// update stuff every 1 second
		const elapsedSec = time - prevSec;
		if (elapsedSec >= 1000) {
			prevSec += 1000;

			count--;
			if (cycle === -1) {
				if (count === 0) {
					cycle = 0;
					count = exercise.routine[step].duration;
					prevStep = time;
				}
			} else {
				if (count === 0) {
					if (step === exercise.routine.length - 1) {
						cycle++;
						step = 0;
					} else {
						step++;
					}
					prevStep = time;
					count = exercise.routine[step].duration;
					text = exercise.routine[step].name;
				}
			}
		}
		timer = window.requestAnimationFrame(frame);
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
			<div class="box">
				<div class="box-inner"></div>
				<div class="circle" bind:this={circle}></div>
			</div>
		</div>
		<div class="count">{cycle >= -1 ? cycle : ''}</div>
		<div class="count">{cycle >= -1 ? count : ''}</div>
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

<audio bind:this={inWav}>
	<source src="/audio/breathe-in.wav" type="audio/wav" />
	Your browser does not support the audio element.
</audio>
<audio bind:this={outWav}>
	<source src="/audio/breathe-out.wav" type="audio/wav" />
	Your browser does not support the audio element.
</audio>
<audio bind:this={holdWav}>
	<source src="/audio/hold.wav" type="audio/wav" />
	Your browser does not support the audio element.
</audio>
<audio bind:this={forestWav}>
	<source src="/audio/forest.mp3" type="audio/mp3" />
	Your browser does not support the audio element.
</audio>

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
	}

	.box {
		width: 11rem;
		height: 11rem;
		background: var(--bg-2);
		border-radius: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.box-inner {
		width: 9rem;
		height: 9rem;
		background: var(--bg);
	}

	.circle {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: var(--txt);
		// animation: 4s linear 1 breathe;
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
