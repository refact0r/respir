<script>
	import IconPlay from '~icons/ph/play-duotone';
	import IconPause from '~icons/ph/pause-duotone';
	import IconHouse from '~icons/ph/house-duotone';
	import IconReset from '~icons/ph/arrow-clockwise-duotone';
	import { onMount, onDestroy } from 'svelte';
	import { preferences } from '$lib/stores/preferences.js';
	import { bestHold } from '$lib/stores/exercises.js';

	let exercise = {
		cycles: -1,
		animation: 'circle',
		routine: [{ name: 'hold', duration: 2, type: 'hold' }]
	};

	let inWav, outWav, holdWav, forestWav;

	onMount(() => {
		inWav = new Audio('/audio/breathe-in.wav');
		outWav = new Audio('/audio/breathe-out.wav');
		holdWav = new Audio('/audio/hold.wav');
		forestWav = new Audio('/audio/forest.mp3');
		inWav.volume = $preferences.speechVolume;
		outWav.volume = $preferences.speechVolume;
		holdWav.volume = $preferences.speechVolume;
		forestWav.volume = $preferences.ambienceVolume;
	});

	onDestroy(() => {
		stopAudio();
	});

	let play = false;
	let cycle = -2;
	let minutes = 0;
	let timer;

	let count = 0;
	let text = 'click play to start';

	let prevSec;
	let prevMin = 0;

	let size = 18;
	let trackSize = 1;
	let circleSize = 2.5;
	let offset = (circleSize - trackSize) / -2 - 1;

	let circleElem;
	let textElem;
	let countElem;

	// when play/pause is clicked
	function togglePlay() {
		if (!play) {
			play = true;
			cycle = -1;
			count = 3;
			text = 'breathe in';
			circleElem.style.transform = `rotate(0deg)`;
			countElem.style.opacity = 1;
			textElem.style.opacity = 1;
			forestWav.play();
			inWav.play();
			timer = window.requestAnimationFrame(firstFrame);
		} else {
			play = false;
			stopAudio();
		}
	}

	function onKeyDown(e) {
		if (e.key === ' ') {
			togglePlay();
		}
	}

	function stopAudio() {
		forestWav.pause();
		inWav.pause();
		outWav.pause();
		holdWav.pause();
		forestWav.currentTime = 0;
		inWav.currentTime = 0;
		outWav.currentTime = 0;
		holdWav.currentTime = 0;
	}

	function formatTime(secs) {
		let mins = Math.floor(secs / 60);
		let remainder = Math.round(secs % 60);
		return `${mins}:${remainder.toString().padStart(2, '0')}`;
	}

	// initialize start time
	function firstFrame(time) {
		prevSec = time;
		frame(time);
	}

	// main event loop
	function frame(time) {
		const elapsedSec = time - prevSec;

		if (!play) {
			if (cycle >= 0) {
				let finalTime = (count * 1000 + elapsedSec) / 1000;
				countElem.style.opacity = 1;
				count = finalTime;
				console.log(finalTime);
				if (finalTime >= $bestHold) {
					$bestHold = finalTime;
					text = 'new best time!';
				}
			}
			return;
		}

		// animate stuff
		if (cycle >= 0) {
			animateCircle(time);
		}
		animateText(elapsedSec);

		// update stuff every 1 second
		if (elapsedSec >= 1000) {
			prevSec += 1000;

			if (cycle === -1) {
				count--;
				if (count === 0) {
					prevMin = prevSec;
					cycle = 0;
					text = 'hold';
					holdWav.play();
				}
			} else {
				count++;
			}
		}
		timer = window.requestAnimationFrame(frame);
	}

	// animate circle around circle
	function animateCircle(time) {
		const elapsedMin = time - prevMin;
		circleElem.style.transform = `rotate(${(elapsedMin / 1000 / 60) * 360}deg)`;
	}

	// animate text fades
	function animateText(elapsedSec) {
		if (elapsedSec >= 800) {
			const progress = 1 - (elapsedSec - 800) / 200;
			countElem.style.opacity = progress;
			if (count === 1 && cycle < 0) {
				textElem.style.opacity = progress;
			}
		} else if (elapsedSec <= 200) {
			const progress = 1 - (200 - elapsedSec) / 200;
			countElem.style.opacity = progress;
			if (cycle === 0 && count === 0) {
				textElem.style.opacity = progress;
			}
		}
	}

	function clearBest() {
		$bestHold = 0;
	}
</script>

<svelte:head>
	<title>respir: {exercise.name}</title>
	<meta name="description" content="" />
</svelte:head>

<head></head>

<main>
	<div class="top">
		<div class="bestTime">
			best time - {formatTime($bestHold)}
		</div>
		<button class="small-button" on:click={clearBest}>
			<IconReset style="font-size: 1.3rem;" />
		</button>
	</div>
	<div class="middle">
		<div class="visualizer">
			<div class="loop">
				<div class="count" bind:this={countElem}>{cycle < 0 ? count : formatTime(count)}</div>
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
			<IconHouse style="font-size: 1.3rem;" />
		</a>
		<button class="icon-button play" on:click={togglePlay}>
			{#if play}
				<IconPause style="font-size: 1.8rem;" />
			{:else}
				<IconPlay style="font-size: 1.8rem;" />
			{/if}
		</button>
		<button class="icon-button reset">
			<IconReset style="font-size: 1.3rem;" />
		</button>
	</div>
</main>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<style lang="scss">
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.bestTime {
		font-size: 1.4rem;
		text-align: center;
	}

	.small-button {
		@include flexCenter;
		display: inline-flex;
	}

	.middle {
		@include flexCenter;

		flex: 1;
		flex-direction: column;
		gap: 2rem;
		margin: 2rem;
	}

	.bottom {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.visualizer {
		margin-top: 1rem;
	}

	.text {
		font-size: 2rem;
	}

	.icon-button.play {
		padding: 1.4rem;

		&:active {
			animation: none;
		}
	}

	.reset {
		visibility: hidden;
	}

	$size: 18rem;
	$track-size: 1rem;
	$circle-size: 2.5rem;
	$offset: calc(-1rem * ($circle-size - $track-size) / 2rem - 1rem);

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
