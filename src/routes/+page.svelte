<script>
	import { fade } from 'svelte/transition';
	import IconAir from '~icons/ph/wind-duotone';
	import IconGear from '~icons/ph/gear-duotone';
	import IconInfo from '~icons/ph/info-duotone';
	import IconSlider from '~icons/ph/sliders-horizontal-duotone';
	import IconPlus from '~icons/ph/plus';
	import { exercises } from '$lib/exercises.js';

	let bestTime = 60;

	let fakeActivity = [
		{ value: 3, date: new Date('2024-01-01') },
		{ value: 12, date: new Date('2024-01-02') },
		{ value: 4, date: new Date('2024-01-03') },
		{ value: 6, date: new Date('2024-01-04') },
		{ value: 8, date: new Date('2024-01-05') },
		{ value: 10, date: new Date('2024-01-06') },
		{ value: 7, date: new Date('2024-01-07') },
		{ value: 2, date: new Date('2024-01-08') },
		{ value: 5, date: new Date('2024-01-09') },
		{ value: 9, date: new Date('2024-01-10') },
		{ value: 1, date: new Date('2024-01-11') }
	];
	let largest = Math.max(...fakeActivity.map((x) => x.value));

	let cyclesPrompt;
	let cycles;
	let eID;
	let eIDcycles;

	function toggleCycles(id) {
		if (cyclesPrompt.style.opacity == 1) {
			cyclesPrompt.style.opacity = 0;
		} else {
			cyclesPrompt.style.opacity = 1;
			cyclesPrompt.id = id;
		}
		eID = id;
		eIDcycles = exercises[eID].cycles;
	}

	function closeCycles() {
		cyclesPrompt.style.opacity = 0;
	}

	function setCycles() {
		let cyclesCount = cycles.value;

		if (cyclesCount) {
			exercises[eID].cycles = cyclesCount;
		} else {
			exercises[eID].cycles = 10;
		}
		cyclesPrompt.style.opacity = 0;
	}

	function totalTime(exercise) {
		let cycleDuration = exercise.routine.reduce((sum, curr) => sum + curr.duration, 0);
		let secs = cycleDuration * exercise.cycles;
		return formatTime(secs);
	}

	function formatTime(secs) {
		let mins = Math.floor(secs / 60);
		let remainder = secs % 60;
		return `${mins}:${remainder.toString().padStart(2, '0')}`;
	}

	function formatDate(date) {
		let month = date.getMonth() + 1;
		let day = date.getDate();
		return `${month}/${day}`;
	}
</script>

<svelte:head>
	<title>respir</title>
	<meta name="description" content="" />
</svelte:head>

<main>
	<div class="form-popup" bind:this={cyclesPrompt}>
		<form class="form-container">
			<label for="cycles">enter number of cycles for {eID} breathing:</label>
			<br />
			<input type="number" min="1" step="1" value={eIDcycles} bind:this={cycles} />

			<button type="submit" class="btn" on:click|preventDefault={() => setCycles()}>submit</button>
			<button type="button" class="btn cancel" on:click|preventDefault={() => closeCycles()}
				>close</button
			>
		</form>
	</div>
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
		<div class="graph">
			{#each fakeActivity as { value, date }}
				<div class="day">
					<div class="bar" style="height: {(value / largest) * 100}%;"></div>
					<div class="label">{formatDate(date)}</div>
				</div>
			{/each}
		</div>

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
						on:click|preventDefault={() => toggleCycles(id)}
					>
						<IconSlider style="font-size: 1rem;" />
					</button>
				</a>
			{/each}
			<a href="/hold-test" class="exercise" title="breath holding test">
				<div class="left">
					<h3>breath holding test</h3>
					<p>best time - {formatTime(bestTime)}</p>
					<p>test your breath-holding capacity</p>
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
		padding: 1.5rem 0 1rem 0;

		display: flex;
		justify-content: space-around;
		align-items: flex-end;
	}

	.day {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: flex-end;
		gap: 0.3rem;
		height: 100%;
	}

	.bar {
		width: 1rem;
		background-color: var(--bg-3);
		margin: 0 0.1rem;
		border-radius: 0.5rem;
	}

	.form-popup {
		opacity: 0;
		transition: all 0.2s ease-out;
		//display: none;
		position: fixed;
		align-items: center;
		top: 25%;
		margin: auto;
		//border: 3px solid #f1f1f1;
		z-index: 9;
	}

	.form-container {
		max-width: 400px;
		padding: 2rem;
		background-color: hsla(168, 100%, 92%, 0.8);
		border-radius: 2rem;
	}

	.form-container input[type='number'] {
		width: 100%;
		padding: 15px;
		margin: 5px 0 22px 0;
		border: none;
		background-color: hsla(164, 35%, 68%, 0.8);
		border-radius: 2rem;
	}

	.form-container input[type='number']:focus {
		background-color: hsla(164, 55%, 82%, 0.8);
		outline: none;
	}

	.form-container .btn {
		background-color: hsla(164, 25%, 61%, 0.8);
		color: white;
		padding: 16px 20px;
		border: none;
		cursor: pointer;
		width: 100%;
		margin-bottom: 10px;
		border-radius: 2rem;
		transition: 0.2s;
	}

	.form-container .btn:hover,
	.open-button:hover {
		background-color: hsla(165, 14%, 51%, 0.8);
	}
</style>
