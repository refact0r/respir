<script>
	import IconPlay from '~icons/ph/play-duotone';
	import IconPause from '~icons/ph/pause-duotone';
	import IconHouse from '~icons/ph/house-duotone';
	// import IconGear from '~icons/ph/gear-duotone';
	import IconReset from '~icons/ph/arrow-clockwise-duotone';

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

	let prevSec, prevStep;
	let pausedSec, pausedStep;

	let boxSize = 20;
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
		count = 0;
		text = 'click play to start';
		circleElem.style.left = `${offset}rem`;
		circleElem.style.bottom = `${offset}rem`;
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
			animateBox(time);
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
							reset();
							cycle = exercise.cycles;
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
		const distance = boxSize - trackSize;
		const increasing = (elapsedStep / 1000 / stepDuration) * distance + offset;
		const decreasing = distance - (elapsedStep / 1000 / stepDuration) * distance + offset;
		if (step === 0) {
			circleElem.style.left = `${offset}rem`;
			circleElem.style.bottom = `${increasing}rem`;
		} else if (step === 1) {
			circleElem.style.left = `${increasing}rem`;
			circleElem.style.bottom = `${distance + offset}rem`;
		} else if (step === 2) {
			circleElem.style.left = `${distance + offset}rem`;
			circleElem.style.bottom = `${decreasing}rem`;
		} else if (step === 3) {
			circleElem.style.left = `${decreasing}rem`;
			circleElem.style.bottom = `${offset}rem`;
		}
	}

	// animate text fades
	function animateText(elapsedSec) {
		if (elapsedSec >= 800) {
			const progress = 1 - (elapsedSec - 800) / 200;
			countElem.style.opacity = progress;
			if (count === 1) {
				textElem.style.opacity = progress;
				if (step === exercise.routine.length - 1 && cycle < exercise.cycles) {
					barElem.style.width = `${(cycle / exercise.cycles) * 100 + (((elapsedSec - 800) / 200) * 100) / exercise.cycles}%`;
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
	<title>Breathe - Zen Rhythm</title>
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
			<div class="box">
				<div class="count" bind:this={countElem}>{cycle >= -1 ? count : ''}</div>
				<div class="circle" bind:this={circleElem}></div>
			</div>
		</div>
		<div class="text" bind:this={textElem}>
			{#if text === 'click play to start'}
				click <span class="textIcon">
					<IconPlay style="font-size: 1.4rem;" />
				</span> to start
			{:else}
				{text}
			{/if}
		</div>
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
		<button class="side-button" on:click={reset}>
			<IconReset style="font-size: 1.5rem;" />
		</button>
		<!-- <button class="side-button" on:click={toggleSettings}>
			<IconGear style="font-size: 1.5rem;" />
		</button> -->
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

	.top {
		padding: 2rem;
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.bar {
		background: var(--bg-2);
		border: none;
		border-radius: 1rem;
		width: 12rem;
		height: 1rem;
		overflow: hidden;
	}

	.value {
		height: 100%;
		width: 0%;
		background: var(--bg-3);
	}

	.cycle {
		width: 3rem;
		text-align: right;
	}

	.total {
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

	.textIcon {
		display: inline-block;
		vertical-align: middle;
		line-height: 0.8;
	}

	.side-button,
	.play-button {
		@include iconButton;
	}

	.play-button {
		padding: 1.6rem;
	}

	$box-size: 20rem;
	$track-size: 1rem;
	$circle-size: 2.5rem;
	$offset: calc(-1rem * ($circle-size - $track-size) / 2rem - 1rem);

	.box {
		width: $box-size;
		height: $box-size;
		border: $track-size solid var(--bg-2);
		border-radius: 2rem;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.count {
		font-size: 3rem;
	}

	.circle {
		position: absolute;
		left: $offset;
		bottom: $offset;
		width: $circle-size;
		height: $circle-size;
		border-radius: 50%;
		border: 2.5px solid var(--txt);
		background: var(--bg-3);
	}
</style>
