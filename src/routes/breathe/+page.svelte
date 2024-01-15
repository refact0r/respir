<script>
	import IconPlay from '~icons/ph/play-duotone';
	import IconPause from '~icons/ph/pause-duotone';
	import IconHouse from '~icons/ph/house-duotone';
	import IconGear from '~icons/ph/gear-duotone';

	let inWav, outWav, holdWav, forestWav;

	let exercise = {
		name: 'Box Breathing',
		description: '',
		cycles: 3,
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
	let text = 'click play to start';

	let circle;
	let outerBox = 16;
	let innerBox = 14;
	let offset = 0.5;
	let circleSize = (outerBox - innerBox) / 2;

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
		if (cycle >= 0) {
			animateBox(time);
		}

		// update stuff every 1 second
		const elapsedSec = time - prevSec;
		if (elapsedSec >= 1000) {
			prevSec += 1000;

			count--;
			if (cycle === -1) {
				// end countdown
				if (count === 0) {
					cycle = 0;
					count = exercise.routine[step].duration;
					prevStep = time;
				}
			} else {
				// go to next step
				if (count === 0) {
					if (step === exercise.routine.length - 1) {
						step = 0;
						cycle++;
						// all cycles complete
						if (cycle === exercise.cycles) {
							cycle = -2;
							play = false;
							count = 0;
							text = 'click to start';
							return;
						}
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

	// animate circle around box
	function animateBox(time) {
		const elapsedStep = time - prevStep;
		const stepDuration = exercise.routine[step].duration;
		const distance = outerBox - circleSize;
		const increasing = (elapsedStep / 1000 / stepDuration) * distance - offset;
		const decreasing = distance - (elapsedStep / 1000 / stepDuration) * distance - offset;
		if (step === 0) {
			circle.style.left = `${-offset}rem`;
			circle.style.bottom = `${increasing}rem`;
		} else if (step === 1) {
			circle.style.left = `${increasing}rem`;
			circle.style.bottom = `${distance - offset}rem`;
		} else if (step === 2) {
			circle.style.left = `${distance - offset}rem`;
			circle.style.bottom = `${decreasing}rem`;
		} else if (step === 3) {
			circle.style.left = `${decreasing}rem`;
			circle.style.bottom = `${-offset}rem`;
		}
	}

	function toggleSettings() {}
</script>

<svelte:head>
	<title>Breathe - Zen Rhythm</title>
	<meta name="description" content="" />
</svelte:head>

<head></head>

<main>
	<div class="middle">
		<div class="visualizer">
			<div class="box">
				<div class="box-inner">
					<div class="count">{cycle >= -1 ? count : ''}</div>
				</div>
				<div class="circle" bind:this={circle}></div>
			</div>
		</div>
		<div class="text">{text}</div>
	</div>
	<div class="bottom">
		<a class="side-button" href="/">
			<IconHouse style="font-size: 1.5rem;" />
		</a>
		<button class="play-button" on:click={togglePlay}>
			{#if play}
				<IconPause style="font-size: 2rem;" />
			{:else}
				<IconPlay style="font-size: 2rem;" />
			{/if}
		</button>
		<button class="side-button" on:click={toggleSettings}>
			<IconGear style="font-size: 1.5rem;" />
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
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 3rem;
	}

	.bottom {
		padding: 2rem;
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.visualizer {
		margin-top: 3rem;
	}

	.text {
		font-size: 2rem;
	}

	.side-button,
	.play-button {
		color: inherit;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		background: var(--bg-2);
	}

	.side-button {
		padding: 1rem;
	}

	.play-button {
		padding: 1.6rem;
		height: auto;
	}

	.box {
		width: 16rem;
		height: 16rem;
		background: var(--bg-2);
		border-radius: 1rem;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.box-inner {
		width: 14rem;
		height: 14rem;
		background: var(--bg);
		border-radius: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.count {
		font-size: 3rem;
	}

	.circle {
		position: absolute;
		left: -0.5rem;
		bottom: -0.5rem;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		border: 2.5px solid var(--txt);
		background: var(--bg-3);
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
