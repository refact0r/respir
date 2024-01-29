<script>
	import { fade } from 'svelte/transition';
	import IconAir from '~icons/ph/wind-duotone';
	import IconUser from '~icons/ph/user-circle-duotone';
	import IconGear from '~icons/ph/gear-duotone';
	import IconInfo from '~icons/ph/info-duotone';
	import IconSlider from '~icons/ph/sliders-horizontal-duotone';
	import IconPlus from '~icons/ph/plus';
	import IconTrash from '~icons/ph/trash';
	import { exercises } from '$lib/exercises.js';
	import { presets } from '$lib/custom-presets.js';
	import { invalidate } from '$app/navigation';

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

	let showCycles = false;
	let currentId;
	let currentCycles;

	function openCycles(id) {
		showCycles = true;
		currentId = id;
		currentCycles = exercises[id].cycles;
	}

	function closeCycles() {
		showCycles = false;
	}

	function setCycles() {
		if (currentCycles > 0 && currentCycles % 1 == 0) {
			exercises[currentId].cycles = currentCycles;
		} else {
			exercises[currentId].cycles = 10;
		}

		showCycles = false;
	}

	let showCustomDetails = false;
	let customId;
	let customName;
	let customDescription;
	let customCycles;
	let customAnimation;
	let customInDur;
	let customHold1Dur;
	let customOutDur;
	let customHold2Dur;

	function openCustom(id) {
		showCustomDetails = true;
		customId = id;
		customName = presets[id].name.slice(0, presets[id].name.length - 10);
		customDescription = presets[id].description;
		customCycles = presets[id].cycles;
		customAnimation = presets[id].animation;
		customInDur = presets[id].routine[0].duration;
		if (presets[id].routine.length > 3) {
			customHold1Dur = presets[id].routine[1].duration;
			customOutDur = presets[id].routine[2].duration;
			customHold2Dur = presets[id].routine[3].duration;
		} else if (presets[id].routine.length > 2) {
			if (presets[id].routine[1].name.includes('hold')) {
				customHold1Dur = presets[id].routine[1].duration;
				customOutDur = presets[id].routine[2].duration;
				customHold2Dur = 0;
			} else {
				customHold1Dur = 0;
				customOutDur = presets[id].routine[1].duration;
				customHold2Dur = presets[id].routine[2].duration;
			}
		} else {
			customHold1Dur = 0;
			customOutDur = presets[id].routine[1].duration;
			customHold2Dur = 0;
		}
	}

	function closeCustom() {
		showCustomDetails = false;
	}

	function setCustom() {
		let choice;
		/*if (customName.length > 0) {
			presets[customId].name = customName + ' breathing';
		}*/
		presets[customId].description = customDescription;
		if (customCycles > 0 && customCycles % 1 == 0) {
			presets[customId].cycles = customCycles;
		}
		if (!(customInDur > 0 && customInDur % 1 == 0)) {
			customInDur = 1;
		}
		if (!(customOutDur > 0 && customOutDur % 1 == 0)) {
			customOutDur = 1;
		}
		if (!(customHold1Dur % 1 == 0)) {
			customHold1Dur = 1;
		}
		if (!(customHold2Dur % 1 == 0)) {
			customHold2Dur = 1;
		}
		let routineType1 = {
			routine: [
				{
					name: 'breathe in',
					duration: 4,
					type: 'in'
				},
				{
					name: 'breathe out',
					duration: 4,
					type: 'out'
				}
			]
		};
		let routineType2 = {
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
				}
			]
		};
		let routineType3 = {
			routine: [
				{
					name: 'breathe in',
					duration: 4,
					type: 'in'
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
		let routineType4 = {
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
		if (customHold1Dur > 0 && customHold2Dur > 0) {
			routineType4.routine[0].duration = customInDur;
			routineType4.routine[1].duration = customHold1Dur;
			routineType4.routine[2].duration = customOutDur;
			routineType4.routine[3].duration = customHold2Dur;
			choice = routineType4;
		} else if (customHold2Dur > 0) {
			routineType3.routine[0].duration = customInDur;
			routineType3.routine[1].duration = customOutDur;
			routineType3.routine[2].duration = customHold2Dur;
			choice = routineType3;
		} else if (customHold1Dur > 0) {
			routineType2.routine[0].duration = customInDur;
			routineType2.routine[1].duration = customHold1Dur;
			routineType2.routine[2].duration = customOutDur;
			choice = routineType2;
		} else {
			routineType1.routine[0].duration = customInDur;
			routineType1.routine[1].duration = customOutDur;
			choice = routineType1;
		}

		presets[customId].routine = choice.routine;

		showCustomDetails = false;
	}

	function deleteCustom(id) {
		showCustomDetails = false;
		delete presets[id];
		const element = document.getElementById(id);
		var id = setInterval(frame, 10);
		var degree = 0;
		var opacity = 1;
		function frame() {
			if (degree == 180) {
				clearInterval(id);
				element.remove();
			} else {
				degree += 2;
				opacity -= 0.012;
				element.style.scale = 50 * Math.cos((degree * Math.PI) / 180) + 50 + '%';
				element.style.opacity = opacity;
			}
		}
	}

	function copyCustom() {
		let text = '';
		let order = '';

		let unfilteredName = presets[customId].name.slice(0, presets[customId].name.length - 10);
		let filteredName = '';
		for (let i = 0; i < unfilteredName.length; i++) {
			filteredName += unfilteredName.charCodeAt(i) + '.';
		}
		let unfilteredDesc = presets[customId].description;
		let filteredDesc = '';
		for (let i = 0; i < unfilteredDesc.length; i++) {
			filteredDesc += unfilteredDesc.charCodeAt(i) + '.';
		}

		if (presets[customId].routine.length > 3) {
			order =
				'ihoh;' +
				presets[customId].routine[0].duration +
				';' +
				presets[customId].routine[1].duration +
				';' +
				presets[customId].routine[2].duration +
				';' +
				presets[customId].routine[3].duration +
				';';
		} else if (presets[customId].routine.length > 2) {
			if (presets[customId].routine[1].type === 'hold') {
				order =
					'iho;' +
					presets[customId].routine[0].duration +
					';' +
					presets[customId].routine[1].duration +
					';' +
					presets[customId].routine[2].duration +
					';';
			} else {
				order =
					'ioh;' +
					presets[customId].routine[0].duration +
					';' +
					presets[customId].routine[1].duration +
					';' +
					presets[customId].routine[2].duration +
					';';
			}
		} else {
			order =
				'io;' +
				presets[customId].routine[0].duration +
				';' +
				presets[customId].routine[1].duration +
				';';
		}

		text += filteredName + ';' + filteredDesc + ';' + presets[customId].cycles + ';' + order;

		navigator.clipboard.writeText(text);
		//showCustomDetails = false;
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
	{#if showCycles}
		<div class="form-popup" transition:fade={{ duration: 100 }}>
			<form class="form-container" transition:fade={{ duration: 100 }}>
				<label for="cycles">number of cycles</label>
				<input type="number" min="1" step="1" bind:value={currentCycles} />

				<button type="submit" class="btn" on:click|preventDefault={() => setCycles()}>
					update
				</button>
				<button type="button" class="btn cancel" on:click|preventDefault={() => closeCycles()}>
					close
				</button>
			</form>
		</div>
	{/if}

	{#if showCustomDetails}
		<div class="form-popup" transition:fade={{ duration: 100 }}>
			<form class="form-container g" transition:fade={{ duration: 100 }}>
				<div class="row">
					<div class="column">
						<label for="name" style="font-size: 1rem;">name:</label>
						<br />
						<input
							type="text"
							name="name"
							title="name for custom breathing exercise (uneditable)"
							minlength="1"
							maxlength="20"
							bind:value={customName}
							disabled
						/>
						<br /><br />
						<label for="description" style="font-size: 1rem;">description:</label>
						<br />
						<input
							type="text"
							name="description"
							title="input description for custom breathing exercise"
							maxlength="40"
							bind:value={customDescription}
						/>
						<br /><br />
						<label for="cycles" style="font-size: 1rem;">cycle count:</label>
						<br />
						<input
							type="number"
							name="cycles"
							title="input number of cycles for custom breathing exercise"
							min="1"
							step="1"
							required
							bind:value={customCycles}
						/>
						<br /><br />
						<p style="margin:0px;">animation shape:</p>
						<div class="dots">
							<input
								type="radio"
								id="circle"
								name="animation-shape"
								value="circle"
								checked="checked"
								title="circle animation option for custom breathing exercise"
							/>
							<label for="circle" style="font-size: 1rem;">circle</label><br />
							<input
								type="radio"
								id="box"
								name="animation-shape"
								value="box"
								disabled
								title="box animation option for custom breathing exercise (currently not available)"
							/>
							<label for="box" style="font-size: 1rem;">box</label>
						</div>
					</div>
					<div class="column">
						<label for="bid" style="font-size: 1rem;">breathe in duration: </label>
						<br />
						<input
							type="number"
							name="bid"
							title="input breathe in duration"
							min="1"
							step="1"
							required
							bind:value={customInDur}
						/> <br /><br />
						<label for="bfhd" style="font-size: 1rem;">breathe first hold duration: </label>
						<br />
						<input
							type="number"
							name="bfhd"
							title="input breathe first hold duration (set this to zero for no hold)"
							min="0"
							step="1"
							required
							bind:value={customHold1Dur}
						/> <br /><br />
						<label for="bod" style="font-size: 1rem;">breathe out duration: </label>
						<br />
						<input
							type="number"
							name="bod"
							title="input breathe out duration"
							min="1"
							step="1"
							required
							bind:value={customOutDur}
						/> <br /><br />
						<label for="bshd" style="font-size: 1rem;">breathe second hold duration: </label>
						<br />
						<input
							type="number"
							name="bshd"
							title="input breathe second hold duration (set this to zero for no hold)"
							min="0"
							step="1"
							required
							bind:value={customHold2Dur}
						/> <br /><br />
					</div>
				</div>
				<div class="row">
					<div class="columb">
						<button type="submit" class="btn l" on:click|preventDefault={() => setCustom()}>
							update
						</button>
					</div>
					<div class="columb">
						<button type="button" class="btn c" on:click|preventDefault={() => closeCustom()}>
							close
						</button>
					</div>
					<div class="columb">
						<button type="button" class="btn" on:click|preventDefault={() => copyCustom()}>
							copy
						</button>
					</div>
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
				<a href="login" class="icon-button" title="account">
					<IconUser style="font-size: 1.3rem;" />
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
						on:click|preventDefault={() => openCycles(id)}
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
			{#each Object.keys(presets) as cid}
				<a href="/{cid}" class="exercise" id={cid} title="{cid} breathing">
					<div class="left">
						<h3>{presets[cid].name}</h3>
						<p>{presets[cid].cycles} cycles - {totalTime(presets[cid])}</p>
						<p>{presets[cid].description}</p>
					</div>
					<button
						class="icon-button"
						title="edit custom exercise preset details"
						on:click|preventDefault={() => openCustom(cid)}
						style="position: fixed;right: 4rem;"
					>
						<IconSlider style="font-size: 1rem;" />
					</button>
					<button
						class="icon-button"
						title="delete custom exercise preset"
						on:click|preventDefault={() => deleteCustom(cid)}
					>
						<IconTrash style="font-size: 1rem;" />
					</button>
				</a>
			{/each}
		</div>
		<a href="/create" class="exercise create" id="create" title="create new custom exercise">
			<IconPlus /><span>create or import custom exercise</span>
		</a>
	</section>
</main>

<style lang="scss">
	main {
		flex: 1;
		flex-direction: column;

		@include flexCenter;
	}

	.row {
		display: flex;
	}

	.column {
		flex: 50%;
		padding: 0rem 2rem;
	}

	.columb {
		flex: 33%;
		padding: 0rem 0.5rem;
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

		&.b {
			margin-bottom: 1rem;
		}
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
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9;
		backdrop-filter: blur(6px);
		top: 0;
		left: 0;
	}

	.form-container {
		max-width: 30rem;
		width: 100%;
		padding: 2rem;
		background-color: var(--bg-2);
		border-radius: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		&.g {
			max-width: 40rem;
		}
	}

	.form-container label {
		font-size: 1.2rem;
	}

	.form-container input[type='number'] {
		width: 100%;
		border: none;
		padding: 0.5rem;
		border-radius: 1rem;
		font: inherit;
		color: inherit;
		background-color: var(--bg-3);
	}

	.form-container input[type='number']:focus {
		outline: none;
		background-color: var(--bg-2);
	}

	.form-container input[type='text'] {
		width: 100%;
		border: none;
		padding: 0.5rem;
		border-radius: 1rem;
		font: inherit;
		color: inherit;
		background-color: var(--bg-3);
	}

	.form-container input[type='text']:focus {
		outline: none;
		background-color: var(--bg-2);
	}

	.form-container input[type='text']:disabled {
		background-color: var(--bg-4);
	}

	.form-container input[type='radio'] {
		appearance: none;
		width: 1rem;
		height: 1rem;
		border: 1px solid var(--bg-3);
		border-radius: 50%;
		outline: none;
		box-shadow: 0 0 5px var(--bg-2);
		transition: box-shadow 0.3s ease;
		&:before {
			content: '';
			display: block;
			width: 60%;
			height: 60%;
			margin: 20% auto;
			border-radius: 50%;
		}
		&:checked:before {
			background: var(--bg-3);
		}
	}

	.form-container button {
		padding: 1rem;
		border-radius: 2rem;
		background-color: var(--bg-3);
		width: 100%;
		transition: 0.2s;
		&:hover {
			background-color: var(--bg-4);
		}
	}
</style>
