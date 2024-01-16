<script>
	import IconAir from '~icons/ph/wind-duotone';
	import IconGear from '~icons/ph/gear-duotone';
	import IconInfo from '~icons/ph/info-duotone';
	import IconSlider from '~icons/ph/sliders-horizontal-duotone';
	import IconPlus from '~icons/ph/plus';
	import { exercises } from '$lib/exercises.js';

	let bestTime = 60;

	function setCycles(id) {
		let cycles = prompt(
			'Please enter the desired number of cycles for this breathing exercise. The default is 10 cycles.',
			exercises[id].cycles
		);

		if (cycles) {
			exercises[id].cycles = cycles;
		}
	}

	function totalTime(exercise) {
		let cycleDuration = exercise.routine.reduce((sum, curr) => sum + curr.duration, 0);
		let secs = cycleDuration * exercise.cycles;
		return format(secs);
	}

	function format(secs) {
		let mins = Math.floor(secs / 60);
		let remainder = secs % 60;
		return `${mins}:${remainder.toString().padStart(2, '0')}`;
	}
</script>

<svelte:head>
	<title>respir</title>
	<meta name="description" content="" />
</svelte:head>

<main>
	<section>
		<div class="head">
			<div class="text">
				<h1>respir <span class="text-icon"><IconAir /></span></h1>
				<p class="description">breathing exercises to help you relax, focus, or sleep.</p>
			</div>

			<div class="buttons">
				<a href="settings" class="icon-button" title="settings">
					<IconGear style="font-size: 1.3rem;" />
				</a>
				<a href="about" class="icon-button" title="about">
					<IconInfo style="font-size: 1.3rem;" />
				</a>
			</div>
		</div>

		<h2>activity</h2>
		<div class="graph"></div>

		<h2>exercises</h2>
		<div class="exercises">
			{#each Object.keys(exercises) as id}
				<a href="/{id}" class="exercise" title="{id} breathing">
					<div class="left">
						<h3>{exercises[id].name}</h3>
						<p>{exercises[id].cycles} cycles - {totalTime(exercises[id])}</p>
						<p>{exercises[id].description}</p>
					</div>
					<button
						class="icon-button"
						title="edit number of cycles"
						on:click|preventDefault={() => setCycles(id)}
					>
						<IconSlider style="font-size: 1rem;" />
					</button>
				</a>
			{/each}
			<a href="/hold-test" class="exercise" title="breath holding test">
				<div class="left">
					<h3>breath holding test</h3>
					<p>best time - {format(bestTime)}</p>
					<p>Test your breath-holding capacity</p>
				</div>
			</a>
		</div>

		<h2>custom exercises</h2>
		<a href="/create" class="exercise create" title="create new custom exercise">
			<IconPlus /><span>create custom exercise</span>
		</a>
	</section>
</main>

<style lang="scss">
	main {
		flex: 1;
		flex-direction: column;

		@include flexCenter;
	}

	h1 {
		font-size: 2.5rem;
		margin: 0;
		font-weight: 700;
		cursor: default;
	}

	h2 {
		margin: 1rem 0 0.5rem 0;
		font-size: 1.1rem;
		font-weight: 500;
	}

	.head {
		display: flex;
		gap: 3rem;
		justify-content: space-between;
		align-items: start;
		margin: 0.5rem 0 2rem 0;
	}

	.description {
		font-size: 1.2rem;
		margin: 1rem 0 0 0;
	}

	.buttons {
		display: flex;
		gap: 1rem;
	}

	.exercises {
		display: grid;
		grid-template-columns: 30rem 30rem;
		gap: 1rem;
	}

	.exercise {
		padding: 1rem;
		background-color: var(--bg-2);
		backdrop-filter: blur(6px);
		border-radius: 1rem;
		text-decoration: none;
		color: inherit;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: start;
		transition: 0.2s;

		h3 {
			margin: 0;
			font-size: 1.3rem;
			font-weight: 600;
		}

		p {
			margin: 0.5rem 0 0 0;
		}

		button {
			padding: 0.6rem;
			backdrop-filter: none;
		}

		&.create {
			justify-content: center;
			align-items: center;
			font-size: 1.2rem;

			span {
				margin-left: 0.5rem;
			}
		}

		&:hover:not(:has(button:hover)) {
			background-color: var(--bg-3);
		}
	}

	.graph {
		height: 10rem;
		width: 100%;
		background-color: var(--bg-2);
		backdrop-filter: blur(6px);
		border-radius: 1rem;
	}
</style>
