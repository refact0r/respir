<script>
	import { fade } from 'svelte/transition';
	import IconAir from '~icons/ph/wind-duotone';
	import IconUser from '~icons/ph/user-circle-duotone';
	import IconGear from '~icons/ph/gear-duotone';
	import IconInfo from '~icons/ph/info-duotone';
	import IconSlider from '~icons/ph/sliders-horizontal-duotone';
	import IconCheck from '~icons/ph/check';
	import IconX from '~icons/ph/x';
	import IconTrash from '~icons/ph/trash-duotone';
	import IconPlus from '~icons/ph/plus';
	import { presets } from '$lib/stores/exercises.js';
	import { customs } from '$lib/stores/exercises.js';

	let bestTime = 60;

	// let fakeActivity = [
	// 	{ value: 3, date: new Date('2024-01-01') },
	// 	{ value: 12, date: new Date('2024-01-02') },
	// 	{ value: 4, date: new Date('2024-01-03') },
	// 	{ value: 6, date: new Date('2024-01-04') },
	// 	{ value: 8, date: new Date('2024-01-05') },
	// 	{ value: 10, date: new Date('2024-01-06') },
	// 	{ value: 7, date: new Date('2024-01-07') },
	// 	{ value: 2, date: new Date('2024-01-08') },
	// 	{ value: 5, date: new Date('2024-01-09') },
	// 	{ value: 9, date: new Date('2024-01-10') },
	// 	{ value: 1, date: new Date('2024-01-11') }
	// ];
	// let largest = Math.max(...fakeActivity.map((x) => x.value));

	let showCycles = false;
	let isCustom = false;
	let currentIdx;
	let currentCycles;

	function openEditCycles(index, custom) {
		showCycles = true;
		currentIdx = index;
		isCustom = custom;
		if (isCustom) {
			currentCycles = custom[index].cycles;
		} else {
			currentCycles = $presets[index].cycles;
		}
	}

	function cancelEditCycles() {
		showCycles = false;
	}

	function setCycles() {
		if (currentCycles > 0 && currentCycles % 1 == 0) {
			if (isCustom) {
				$customs[currentIdx].cycles = currentCycles;
			} else {
				$presets[currentIdx].cycles = currentCycles;
			}
		} else {
			if (isCustom) {
				$customs[currentIdx].cycles = 10;
			} else {
				$presets[currentIdx].cycles = 10;
			}
		}

		showCycles = false;
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

	function deleteExercise(index) {
		$customs = $customs.filter((_, i) => i !== index);
	}
</script>

<svelte:head>
	<title>respir</title>
	<meta name="description" content="" />
</svelte:head>

<main>
	{#if showCycles}
		<div class="form-popup" transition:fade={{ duration: 100 }}>
			<form class="form-container" transition:fade={{ duration: 100 }}>
				<label for="cycles">number of cycles</label>

				<div class="formbuttons">
					<input type="number" min="1" step="1" bind:value={currentCycles} />
					<button
						type="button"
						class="icon-button cancel"
						on:click|preventDefault={() => cancelEditCycles()}
					>
						<IconX style="font-size: 1.3rem;" />
					</button>
					<button
						type="submit"
						class="icon-button submit"
						on:click|preventDefault={() => setCycles()}
					>
						<IconCheck style="font-size: 1.3rem;" />
					</button>
				</div>
			</form>
		</div>
	{/if}
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
				<!-- <a href="login" class="icon-button" title="account">
					<IconUser style="font-size: 1.3rem;" />
				</a> -->
			</div>
		</div>

		<!-- <h2>activity</h2>
		<div class="graph">
			{#each fakeActivity as { value, date }}
				<div class="day">
					<div class="bar" style="height: {(value / largest) * 100}%;"></div>
					<div class="label">{formatDate(date)}</div>
				</div>
			{/each}
		</div> -->

		<h2>exercises</h2>
		<div class="exercises">
			{#each $presets as preset, i}
				<a href="/{preset.id}" class="exercise" title="{preset.id} breathing">
					<div class="left">
						<h3>{preset.name}</h3>
						<p>{preset.cycles} cycles - {totalTime(preset)}</p>
						<p>{preset.description}</p>
					</div>
					<button
						class="icon-button"
						title="edit number of cycles"
						on:click|preventDefault={() => openEditCycles(i, false)}
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
		<div class="exercises b">
			{#each $customs as custom, i}
				<a href="/{custom.id}" class="exercise" title="{custom.id} breathing">
					<div class="left">
						<h3>{custom.name}</h3>
						<p>{custom.cycles} cycles - {totalTime(custom)}</p>
						<p>{custom.description}</p>
					</div>
					<div class="smallbuttons">
						<button
							class="icon-button"
							title="edit number of cycles"
							on:click|preventDefault={() => openEditCycles(i, true)}
						>
							<IconSlider style="font-size: 1rem;" />
						</button>
						<button
							class="icon-button"
							title="delete custom exercise"
							on:click|preventDefault={() => deleteExercise(i)}
						>
							<IconTrash style="font-size: 1rem;" />
						</button>
					</div>
				</a>
			{/each}
		</div>
		<a href="/create" class="exercise create" id="create" title="create new custom exercise">
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

	.smallbuttons {
		display: flex;
		gap: 0.5rem;
	}

	.formbuttons {
		display: flex;
		gap: 1rem;

		input {
			width: 100%;
		}
	}

	.exercises {
		display: grid;
		grid-template-columns: 30rem 30rem;
		gap: 1rem;
	}

	.exercise {
		padding: 1.1rem;
		background-color: var(--bg-2);
		backdrop-filter: blur(6px);
		border-radius: 2rem;
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
			padding: 0.7rem;
			backdrop-filter: none;
		}

		&.create {
			padding: 1rem;
			margin-top: 1rem;
			justify-content: center;
			align-items: center;
			font-size: 1.2rem;

			span {
				margin-left: 0.5rem;
			}
		}

		.left {
			margin-left: 0.3rem;
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
		border-radius: 2rem;
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
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9;
		top: 0;
		left: 0;
		backdrop-filter: blur(6px);
	}

	.form-container {
		max-width: 30rem;
		width: 100%;
		padding: 1.5rem;
		background-color: var(--bg-2);
		border-radius: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-container label {
		font-size: 1.2rem;
	}

	.form-container input[type='number'] {
		width: 100%;
		border: none;
		padding: 0.7rem 1.4rem;
		border-radius: 2rem;
		font: inherit;
		font-size: 1.2rem;
		color: inherit;
		background-color: var(--bg-3);
	}

	.form-container input[type='number']:focus {
		outline: none;
		background-color: var(--bg-2);
	}

	.form-container button {
		background-color: var(--bg-3);
		&:hover {
			background-color: var(--bg-4);
		}
	}
</style>
