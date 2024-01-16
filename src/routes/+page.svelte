<script>
	import IconAir from '~icons/ph/wind-duotone';
	import IconGear from '~icons/ph/gear-duotone';
	import IconSlider from '~icons/ph/sliders-horizontal-duotone';
	import IconPlus from '~icons/ph/plus';
	import { exercises } from '$lib/exercises.js';

	let bestTime = 60;

	function setCycles(id) {
		let cycles = prompt('cycles', exercises[id].cycles);

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
	<title>home - respir</title>
	<meta name="description" content="" />
</svelte:head>

<main>
	<section>
		<div class="head">
			<div class="text">
				<h1>respir <span class="text-icon"><IconAir /></span></h1>
				<p class="description">breathing exercises to help you relax, focus, or sleep.</p>
			</div>

			<a href="settings" class="icon-button"><IconGear style="font-size: 1.5rem;" /></a>
		</div>

		<div class="exercises">
			{#each Object.keys(exercises) as id}
				<a href="/{id}" class="exercise">
					<div class="left">
						<h2>{exercises[id].name}</h2>
						<p>{exercises[id].cycles} cycles - {totalTime(exercises[id])}</p>
						<p>{exercises[id].description}</p>
					</div>
					<button class="icon-button" on:click|preventDefault={() => setCycles(id)}>
						<IconSlider style="font-size: 1rem;" />
					</button>
				</a>
			{/each}
			<a href="/hold-test" class="exercise">
				<div class="left">
					<h2>breath holding test</h2>
					<p>best time - {format(bestTime)}</p>
					<p>Test your breath-holding capacity</p>
				</div>
			</a>
		</div>

		<h3>custom exercises</h3>
		<a href="/create" class="exercise create">
			<IconPlus /><span>create new</span>
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
	}

	.head {
		display: flex;
		gap: 3rem;
		justify-content: space-between;
		align-items: start;
	}

	.description {
		font-size: 1.2rem;
		margin: 1rem 0 0 0;
	}

	.exercises {
		display: grid;
		grid-template-columns: 30rem 30rem;
		gap: 1rem;
		margin: 3rem 0 2rem 0;
	}

	.exercise {
		font-size: 1rem;
		padding: 1rem;
		background-color: var(--bg-2);
		border-radius: 1rem;
		text-decoration: none;
		color: inherit;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: start;

		h2 {
			margin: 0;
			font-size: 1.3rem;
		}

		p {
			margin: 0.5rem 0 0 0;
		}

		button {
			padding: 0.6rem;
		}

		&.create {
			justify-content: center;
			align-items: center;
			font-size: 1.2rem;

			span {
				margin-left: 0.5rem;
			}
		}
	}

	.start-button {
		padding: 1rem;
		background-color: hsla(208, 100%, 97%, 0.6);
		border-radius: 0.5rem;
		text-decoration: none;
		color: rgb(18, 29, 27);
		cursor: pointer;
		transition: 0.25s;
	}

	.start-button span {
		cursor: pointer;
		transition: 0.5s;
		margin-right: -0.5rem;
	}

	.start-button span:after {
		content: '▶';
		position: relative;
		opacity: 0;
		right: 0.5rem;
		margin-right: -0.25rem;
		transition: 0.5s;
	}

	.start-button:hover span {
		padding-right: 25px;
	}

	.start-button:hover span:after {
		opacity: 1;
		right: -0.5rem;
		position: relative;
	}

	.start-button:hover {
		background-color: hsla(0, 0%, 100%, 0.8);
	}
</style>
