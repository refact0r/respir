<script>
	import IconHouse from '~icons/ph/house-duotone';
	import { goto } from '$app/navigation';
	import { presets } from '$lib/custom-presets.js';
	import { fade } from 'svelte/transition';

	let showImport = false;
	let importValue;

	let custom_name;
	let custom_desc;
	let custom_cycles;
	let custom_in_duration;
	let custom_hold_init_duration;
	let custom_out_duration;
	let custom_hold_after_duration;
	let choice;

	function addCustomPreset() {
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
		if (custom_hold_init_duration > 0 && custom_hold_after_duration > 0) {
			routineType4.routine[0].duration = custom_in_duration;
			routineType4.routine[1].duration = custom_hold_init_duration;
			routineType4.routine[2].duration = custom_out_duration;
			routineType4.routine[3].duration = custom_hold_after_duration;
			choice = routineType4;
		} else if (custom_hold_after_duration > 0) {
			routineType3.routine[0].duration = custom_in_duration;
			routineType3.routine[1].duration = custom_out_duration;
			routineType3.routine[2].duration = custom_hold_after_duration;
			choice = routineType3;
		} else if (custom_hold_init_duration > 0) {
			routineType2.routine[0].duration = custom_in_duration;
			routineType2.routine[1].duration = custom_hold_init_duration;
			routineType2.routine[2].duration = custom_out_duration;
			choice = routineType2;
		} else {
			routineType1.routine[0].duration = custom_in_duration;
			routineType1.routine[1].duration = custom_out_duration;
			choice = routineType1;
		}

		let exercise = {
			name: custom_name + ' breathing',
			description: custom_desc ? custom_desc : '',
			cycles: custom_cycles,
			animation: 'circle',
			routine: []
		};
		exercise.routine = choice.routine;
		//console.log(exercise);
		presets[custom_name] = exercise;
		//console.log(presets[custom_name].animation);
		goto('/');
	}

	function returnHome() {
		goto('/');
	}

	function openImport() {
		showImport = true;
	}

	function importObj() {
		let input = importValue;
		const list = [];
		while (input.indexOf(';') != -1) {
			let index = input.indexOf(';');
			let string = input.slice(0, index);
			list.push(string);
			input = input.slice(index + 1);
		}
		if (list.length >= 6) {
			// set name
			let cname = list[0];
			let name = '';
			let name_chars = [];
			while (cname.indexOf('.') != -1) {
				let index = cname.indexOf('.');
				let string = cname.slice(0, index);
				name_chars.push(string);
				cname = cname.slice(index + 1);
			}
			for (let i = 0; i < name_chars.length; i++) {
				name += String.fromCharCode(name_chars[i]);
			}
			custom_name = name;

			// set description
			let cdesc = list[1];
			let desc = '';
			let desc_chars = [];
			while (cdesc.indexOf('.') != -1) {
				let index = cdesc.indexOf('.');
				let string = cdesc.slice(0, index);
				desc_chars.push(string);
				cdesc = cdesc.slice(index + 1);
			}
			for (let i = 0; i < desc_chars.length; i++) {
				desc += String.fromCharCode(desc_chars[i]);
			}
			custom_desc = desc;

			//set cycles
			if (parseInt(list[2])) {
				custom_cycles = list[2];
			}

			//set durations for parts of exercise
			if (list[3] === 'ihoh') {
				custom_in_duration = parseInt(list[4]) ? parseInt(list[4]) : null;
				custom_hold_init_duration = parseInt(list[5]) ? parseInt(list[5]) : null;
				custom_out_duration = parseInt(list[6]) ? parseInt(list[6]) : null;
				custom_hold_after_duration = parseInt(list[7]) ? parseInt(list[7]) : null;
			} else if (list[3] === 'iho') {
				custom_in_duration = parseInt(list[4]) ? parseInt(list[4]) : null;
				custom_hold_init_duration = parseInt(list[5]) ? parseInt(list[5]) : null;
				custom_out_duration = parseInt(list[6]) ? parseInt(list[6]) : null;
				custom_hold_after_duration = 0;
			} else if (list[3] === 'ioh') {
				custom_in_duration = parseInt(list[4]) ? parseInt(list[4]) : null;
				custom_hold_init_duration = 0;
				custom_out_duration = parseInt(list[5]) ? parseInt(list[5]) : null;
				custom_hold_after_duration = parseInt(list[6]) ? parseInt(list[6]) : null;
			} else {
				custom_in_duration = parseInt(list[4]) ? parseInt(list[4]) : null;
				custom_hold_init_duration = 0;
				custom_out_duration = parseInt(list[5]) ? parseInt(list[5]) : null;
				custom_hold_after_duration = 0;
			}
		}

		showImport = false;
	}

	function closeImport() {
		showImport = false;
	}
</script>

<svelte:head>
	<title>respir: create</title>
	<meta name="description" content="" />
</svelte:head>

<main>
	{#if showImport}
		<div
			class="form-popup"
			on:submit|preventDefault={() => importObj()}
			transition:fade={{ duration: 100 }}
		>
			<form class="form-container" transition:fade={{ duration: 100 }}>
				<label for="import">import custom exercise preset data:</label>
				<input type="text" minlength="1" bind:value={importValue} required />

				<button type="submit" class="btn"> import </button>
				<button type="button" class="btn cancel" on:click|preventDefault={() => closeImport()}>
					close
				</button>
			</form>
		</div>
	{/if}
	<h1>create new breathing exercise</h1>
	<div class="form">
		<form on:submit|preventDefault={() => addCustomPreset()}>
			<div class="row">
				<div class="column">
					<label for="name">name:</label>
					<br />
					<input
						type="text"
						name="name"
						title="input name for custom breathing exercise"
						minlength="1"
						maxlength="20"
						required
						bind:value={custom_name}
					/>
					<br /><br />
					<label for="description">description:</label>
					<br />
					<input
						type="text"
						name="description"
						title="input description for custom breathing exercise"
						maxlength="40"
						bind:value={custom_desc}
					/>
					<br /><br />
					<label for="cycles">cycle count:</label>
					<br />
					<input
						type="number"
						name="cycles"
						title="input number of cycles for custom breathing exercise"
						min="1"
						step="1"
						required
						bind:value={custom_cycles}
					/>
					<br />
					<p>animation shape:</p>
					<div class="dots">
						<input
							type="radio"
							id="circle"
							name="animation-shape"
							value="circle"
							checked="checked"
							title="circle animation option for custom breathing exercise"
						/>
						<label for="circle">circle</label><br />
						<input
							type="radio"
							id="box"
							name="animation-shape"
							value="box"
							disabled
							title="box animation option for custom breathing exercise (currently not available)"
						/>
						<label for="box">box</label>
					</div>
				</div>
				<div class="column">
					<label for="bid">breathe in duration: </label>
					<br />
					<input
						type="number"
						name="bid"
						title="input breathe in duration"
						min="1"
						step="1"
						required
						bind:value={custom_in_duration}
					/> <br /><br />
					<label for="bfhd">breathe first hold duration: </label>
					<br />
					<input
						type="number"
						name="bfhd"
						title="input breathe first hold duration (set this to zero for no hold)"
						min="0"
						step="1"
						required
						bind:value={custom_hold_init_duration}
					/> <br /><br />
					<label for="bod">breathe out duration: </label>
					<br />
					<input
						type="number"
						name="bod"
						title="input breathe out duration"
						min="1"
						step="1"
						required
						bind:value={custom_out_duration}
					/> <br /><br />
					<label for="bshd">breathe second hold duration: </label>
					<br />
					<input
						type="number"
						name="bshd"
						title="input breathe second hold duration (set this to zero for no hold)"
						min="0"
						step="1"
						required
						bind:value={custom_hold_after_duration}
					/> <br /><br />
				</div>
			</div>
			<div class="row">
				<div class="column g">
					<button type="submit" class="btn l"> create </button>
				</div>
				<div class="column g b">
					<button type="button" class="btn" on:click|preventDefault={() => returnHome()}>
						cancel
					</button>
				</div>
				<div class="column g b">
					<button type="button" class="btn" on:click|preventDefault={() => openImport()}>
						import
					</button>
				</div>
			</div>
		</form>
	</div>
</main>

<style lang="scss">
	main {
		flex: 1;
		flex-direction: column;

		@include flexCenter;
	}

	.form {
		align-items: center;
		padding: 2rem;
		border-radius: 2rem;
		background-color: var(--bg-2);
	}

	.row {
		display: flex;
	}

	.column {
		flex: 50%;
		padding: 0rem 2rem;

		&.g {
			padding: 0rem 0.5rem;
		}
	}

	p {
		margin-bottom: 0rem;
	}

	.form .btn {
		padding: 1rem;
		border-radius: 2rem;
		background-color: var(--bg-2);
		width: 100%;
		transition: 0.2s;
		&.l {
			float: right;
		}
		&:hover {
			background-color: var(--bg-3);
		}
	}

	.dots {
		padding: 0.5rem 0rem;
	}

	.form input[type='number'] {
		border: none;
		padding: 0.5rem;
		border-radius: 1rem;
		font: inherit;
		color: inherit;
		background-color: var(--bg-3);
	}
	.form input[type='text'] {
		border: none;
		padding: 0.5rem;
		border-radius: 1rem;
		font: inherit;
		color: inherit;
		background-color: var(--bg-3);
	}
	.form input[type='radio'] {
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

	.form input[type='number']:focus {
		outline: none;
		background-color: var(--bg-2);
	}
	.form input[type='text']:focus {
		outline: none;
		background-color: var(--bg-2);
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
	}

	.form-container label {
		font-size: 1.2rem;
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
