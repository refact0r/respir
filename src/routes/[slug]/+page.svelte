<script>
	import IconPlay from '~icons/ph/play-duotone';
	import IconPause from '~icons/ph/pause-duotone';
	import IconHouse from '~icons/ph/house-duotone';
	import IconReset from '~icons/ph/arrow-clockwise-duotone';
	import { onMount, onDestroy } from 'svelte';
	import { ambienceVolume, speechVolume } from '../../lib/stores/volumeData.js';

	let inWav, outWav, holdWav, forestWav;

	export let data;

	let exercise = data.exercise;

	onMount(() => {
		inWav = new Audio('/audio/breathe-in.wav');
		outWav = new Audio('/audio/breathe-out.wav');
		holdWav = new Audio('/audio/hold.wav');
		forestWav = new Audio('/audio/forest.mp3');
		inWav.volume = $speechVolume;
		outWav.volume = $speechVolume;
		holdWav.volume = $speechVolume;
		forestWav.volume = $ambienceVolume;
	});

	onDestroy(() => {
		if (forestWav) {
			forestWav.pause();
			forestWav = null;
		}
	});

	if (exercise.animation === 'circle') {
		let total = exercise.routine.reduce((sum, i) => sum + i.duration, 0);
		let curr = 0;
		for (let i = 0; i < exercise.routine.length; i++) {
			exercise.routine[i].start = (curr / total) * 360;
			curr += exercise.routine[i].duration;
			exercise.routine[i].end = (curr / total) * 360;
		}
	}

	let play = false;
	let cycle = -2;
	let step = 0;
	let timer;

	let count = 0;
	let text = 'click play to start';

	let prevSec, prevStep;
	let pausedSec, pausedStep;

	let size = 20;
	let trackSize = 1;
	let circleSize = 2.5;
	let offset = (circleSize - trackSize) / -2 - 1;

	let circleElem;
	let textElem;
	let countElem;
	let barElem;

	// when play/pause is clicked
	function togglePlay() {
		play = !play;
		// initial start
		if (cycle === -2 || cycle === exercise.cycles) {
			barElem.style.width = '0%';
			cycle = -1;
			count = 3;
			text = 'get ready';
			forestWav.play();
			timer = window.requestAnimationFrame(firstFrame);
			return;
		}
		if (play) {
			timer = window.requestAnimationFrame(resumeFrame);
			forestWav.play();
		} else {
			stopAudio();
		}
	}

	function stopAudio() {
		forestWav.pause();
		inWav.pause();
		outWav.pause();
		holdWav.pause();
	}

	function reset() {
		play = false;
		stopAudio();
		cycle = -2;
		step = 0;
		count = 0;
		text = 'click play to start';
		if (exercise.animation === 'box') {
			circleElem.style.left = `${offset}rem`;
			circleElem.style.bottom = `${offset}rem`;
		} else {
			circleElem.style.transform = `rotate(0deg)`;
		}
		countElem.style.opacity = 1;
		textElem.style.opacity = 1;
	}

	// initialize start time
	function firstFrame(time) {
		prevSec = time;
		prevStep = time;
		frame(time);
	}

	function resumeFrame(time) {
		prevSec = time - pausedSec;
		prevStep = time - pausedStep;
		frame(time);
	}

	// main event loop
	function frame(time) {
		const elapsedSec = time - prevSec;

		if (!play) {
			pausedSec = elapsedSec;
			pausedStep = time - prevStep;
			return;
		}

		// animate stuff
		if (cycle >= 0) {
			if (exercise.animation === 'box') {
				animateBox(time);
			} else {
				animateCircle(time);
			}
		}
		animateText(elapsedSec);

		// update stuff every 1 second
		if (elapsedSec >= 1000) {
			prevSec += 1000;

			count--;
			if (cycle === -1) {
				// end countdown
				if (count === 0) {
					cycle = 0;
					updateStep(time);
				}
			} else {
				// go to next step
				if (count === 0) {
					if (step === exercise.routine.length - 1) {
						step = 0;
						cycle++;
						// all cycles complete
						if (cycle === exercise.cycles) {
							cycle = exercise.cycles;
							reset();
							return;
						}
					} else {
						step++;
					}
					updateStep(time);
				}
			}
		}
		timer = window.requestAnimationFrame(frame);
	}

	function updateStep(time) {
		prevStep = time;
		count = exercise.routine[step].duration;
		text = exercise.routine[step].name;
		if (exercise.routine[step].type === 'in') {
			inWav.play();
		} else if (exercise.routine[step].type === 'out') {
			outWav.play();
		} else if (exercise.routine[step].type === 'hold') {
			holdWav.play();
		}
	}

	// animate circle around box
	function animateBox(time) {
		const elapsedStep = time - prevStep;
		const stepDuration = exercise.routine[step].duration;
		const distance = size - trackSize;
		const increasing = (elapsedStep / 1000 / stepDuration) * distance + offset;
		const decreasing = distance - (elapsedStep / 1000 / stepDuration) * distance + offset;
		switch (step) {
			case 0:
				circleElem.style.left = `${offset}rem`;
				circleElem.style.bottom = `${increasing}rem`;
				break;
			case 1:
				circleElem.style.left = `${increasing}rem`;
				circleElem.style.bottom = `${distance + offset}rem`;
				break;
			case 2:
				circleElem.style.left = `${distance + offset}rem`;
				circleElem.style.bottom = `${decreasing}rem`;
				break;
			case 3:
				circleElem.style.left = `${decreasing}rem`;
				circleElem.style.bottom = `${offset}rem`;
				break;
		}
	}

	// animate circle around circle
	function animateCircle(time) {
		const elapsedStep = time - prevStep;
		const range = exercise.routine[step].end - exercise.routine[step].start;
		circleElem.style.transform = `rotate(${(elapsedStep / 1000 / exercise.routine[step].duration) * range + exercise.routine[step].start}deg)`;
	}

	// animate text fades
	function animateText(elapsedSec) {
		if (elapsedSec >= 800) {
			const progress = 1 - (elapsedSec - 800) / 200;
			countElem.style.opacity = progress;
			if (count === 1) {
				textElem.style.opacity = progress;
				if (step === exercise.routine.length - 1 && cycle < exercise.cycles) {
					barElem.style.width = `${Math.min((cycle / exercise.cycles) * 100 + (((elapsedSec - 800) / 200) * 100) / exercise.cycles, ((cycle + 1) / exercise.cycles) * 100)}%`;
				}
			}
		} else if (elapsedSec <= 200) {
			const progress = 1 - (200 - elapsedSec) / 200;
			countElem.style.opacity = progress;
			if (count === exercise.routine[step].duration && cycle >= 0) {
				textElem.style.opacity = progress;
			}
		}
	}

	// function toggleSettings() {}
</script>

<svelte:head>
	<title>respir: {exercise.name}</title>
	<meta name="description" content="" />
</svelte:head>

<head></head>

<main>
	<div class="top">
		<div class="cycle">{cycle < 0 ? 0 : cycle}</div>
		<div class="bar">
			<div class="value" bind:this={barElem}></div>
		</div>
		<div class="total">{exercise.cycles}</div>
	</div>
	<div class="middle">
		<div class="visualizer">
			<div class={exercise.animation === 'box' ? 'box' : 'loop'}>
				<div class="count" bind:this={countElem}>{cycle >= -1 ? count : ''}</div>
				<div class="circle" bind:this={circleElem}></div>
				{#if exercise.animation === 'circle'}
					{#each exercise.routine as step}
						<div class="tick" style={`transform: rotate(${step.start}deg); `}></div>
					{/each}
				{/if}
			</div>
		</div>
		<div class="text" bind:this={textElem}>
			{#if text === 'click play to start'}
				click <span class="text-icon">
					<IconPlay style="font-size: 1.4rem;" />
				</span> to start
			{:else}
				{text}
			{/if}
		</div>
	</div>
	<div class="bottom">
		<a class="icon-button side" href="/">
			<IconHouse style="font-size: 1.5rem;" />
		</a>
		<button class="icon-button play" on:click={togglePlay}>
			{#if play}
				<IconPause style="font-size: 2rem;" />
			{:else}
				<IconPlay style="font-size: 2rem;" />
			{/if}
		</button>
		<button class="icon-button side" on:click={reset}>
			<IconReset style="font-size: 1.5rem;" />
		</button>
		<!-- <button class="side-button" on:click={toggleSettings}>
			<IconGear style="font-size: 1.5rem;" />
		</button> -->
	</div>
</main>

<style lang="scss">
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top {
		padding: 2rem;
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.bar {
		background-color: var(--bg-2);
		backdrop-filter: blur(3px);
		border: none;
		border-radius: 1rem;
		width: 12rem;
		height: 1rem;
		overflow: hidden;
	}

	.value {
		height: 100%;
		width: 0%;
		background-color: var(--bg-4);
	}

	.cycle {
		font-size: 1.2rem;
		width: 3rem;
		text-align: right;
	}

	.total {
		font-size: 1.2rem;
		width: 3rem;
		text-align: left;
	}

	.middle {
		@include flexCenter;

		flex: 1;
		flex-direction: column;
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

	.icon-button.play {
		padding: 1.6rem;

		&:active {
			animation: none;
		}
	}

	$size: 20rem;
	$track-size: 1rem;
	$circle-size: 2.5rem;
	$offset: calc(-1rem * ($circle-size - $track-size) / 2rem - 1rem);

	.box {
		width: $size;
		height: $size;
		border: $track-size solid var(--bg-2);
		border-radius: 2rem;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.count {
		font-size: 3rem;
		font-weight: 500;
	}

	.circle {
		position: absolute;
		width: $circle-size;
		height: $circle-size;
		border-radius: 50%;
		border: 2.5px solid var(--txt);
		background-color: var(--bg-3);
		backdrop-filter: blur(3px);
	}

	.box .circle {
		left: $offset;
		bottom: $offset;
	}

	.loop .circle {
		left: calc($size / 2 - $circle-size / 2 - $track-size);
		bottom: $offset;
		transform-origin: calc($circle-size / 2) calc(-1 * ($size - $circle-size - $track-size) / 2);
		transform: rotate(0deg);
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.loop {
		width: $size;
		height: $size;
		border-radius: 50%;
		border: $track-size solid var(--bg-2);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	$tick-width: 3px;
	$tick-height: 1rem;

	.tick {
		position: absolute;
		left: calc($size / 2 - $track-size - $tick-width / 2);
		bottom: calc(-1rem * ($tick-height - $track-size) / 2rem - 1rem);
		width: $tick-width;
		height: $tick-height;
		border-radius: $tick-width;
		// border: 2.5px solid var(--txt);
		background-color: var(--bg-4);
		background: var(--txt);
		transform-origin: calc($tick-width / 2) calc(-1 * ($size - $tick-height - $track-size) / 2);
		z-index: -1;
	}
</style>
