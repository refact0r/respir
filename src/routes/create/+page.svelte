<script>
	import IconHouse from '~icons/ph/house-duotone';
	import IconPlus from '~icons/ph/plus';
	import IconImport from '~icons/ph/arrow-square-in-duotone';
	import { goto } from '$app/navigation';
	import { customs } from '$lib/stores/exercises.js';

	let customName;
	let customDesc;
	let customCycles = 10;
	let customBID = 4;
	let customBIHD = 4;
	let customBOD = 4;
	let customBOHD = 4;

	function constructCustom() {
		let custom = {
			id: encodeURIComponent(customName),
			name: customName,
			description: customDesc,
			cycles: customCycles,
			animation: 'circle',
			routine: [
				{
					name: 'breathe in',
					duration: customBID,
					type: 'in'
				}
			]
		};

		if (customBIHD && customBIHD > 0) {
			custom.routine.push({
				name: 'hold',
				duration: customBIHD,
				type: 'hold'
			});
		}
		custom.routine.push({
			name: 'breathe out',
			duration: customBOD,
			type: 'out'
		});
		if (customBOHD && customBOHD > 0) {
			custom.routine.push({
				name: 'hold',
				duration: customBOHD,
				type: 'hold'
			});
		}

		return custom;
	}

	function addCustom() {
		let custom = constructCustom();
		$customs = [...$customs, custom];
		goto('/');
	}

	let importValue;

	function importData() {
		let data = JSON.parse(importValue);
		customName = data.name;
		customDesc = data.description;
		customCycles = data.cycles;
		for (let i = 0; i < data.routine.length; i++) {
			if (data.routine[i].type === 'in') {
				customBID = data.routine[i].duration;
			} else if (data.routine[i].type === 'hold') {
				if (i === 1) {
					customBIHD = data.routine[i].duration;
				} else {
					customBOHD = data.routine[i].duration;
				}
			} else if (data.routine[i].type === 'out') {
				customBOD = data.routine[i].duration;
			}
		}
	}
</script>

<svelte:head>
	<title>respir: create</title>
	<meta name="description" content="create a custom breathing exercise." />
</svelte:head>

<main>
	<div>
		<div class="header">
			<a class="icon-button" href="/">
				<IconHouse style="font-size: 1.3rem;" />
			</a>
			<h1>create custom exercise</h1>
		</div>
		<div class="box">
			<form on:submit|preventDefault={() => importData()}>
				<div class="row">
					<div class="group">
						<label for="import">import exercise data (optional)</label>
						<br />
						<input id="import" type="text" minlength="1" bind:value={importValue} required />
					</div>
					<button type="submit">
						<IconImport style="font-size: 1.2rem;" />import
					</button>
				</div>
			</form>
		</div>
		<br />
		<form on:submit|preventDefault={() => addCustom()}>
			<div class="box">
				<div class="row">
					<div class="group">
						<label for="name">name</label>
						<br />
						<input
							id="name"
							type="text"
							minlength="1"
							maxlength="50"
							required
							bind:value={customName}
						/>
					</div>
					<div class="group cycles">
						<label for="cycles">cycles</label>
						<br />
						<input id="cycles" type="number" min="1" step="1" required bind:value={customCycles} />
					</div>
				</div>
				<div class="group">
					<label for="description">description</label>
					<br />
					<input id="description" type="text" maxlength="100" bind:value={customDesc} />
				</div>
				<div class="row">
					<div class="group">
						<label for="bid">breathe in duration </label>
						<br />
						<input id="bid" type="number" min="1" step="1" required bind:value={customBID} />
					</div>
					<div class="group">
						<label for="bihd">breathe in hold duration </label>
						<br />
						<input id="bihd" type="number" step="1" bind:value={customBIHD} />
					</div>
				</div>
				<div class="row">
					<div class="group">
						<label for="bod">breathe out duration </label>
						<br />
						<input id="bod" type="number" min="1" step="1" required bind:value={customBOD} />
					</div>
					<div class="group">
						<label for="bohd">breathe out hold duration </label>
						<br />
						<input id="bohd" type="number" step="1" bind:value={customBOHD} />
					</div>
				</div>
				<div class="row buttons">
					<button class="" title="submit"><IconPlus style="font-size: 1.2rem;" /> create </button>
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

	.header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.box {
		padding: 1.5rem;
		border-radius: 2rem;
		background-color: var(--bg-2);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		backdrop-filter: blur(6px);
	}

	.row {
		display: flex;
		gap: 1rem;

		&.buttons {
			justify-content: flex-end;
		}
	}

	.group {
		width: 100%;

		&.cycles {
			width: 30%;
		}
	}

	button {
		background-color: var(--bg-2);
		padding: 0.8rem 1rem;
		gap: 0.5rem;
		border-radius: 2rem;
		margin-top: 1rem;
		font-size: 1.2rem;
		transition: background-color 0.2s ease-in-out;

		@include flexCenter;

		&:hover {
			background-color: var(--bg-3);
		}
	}

	label {
		margin-bottom: 0.3rem;
		display: inline-block;
	}

	input {
		width: 100%;
		border: none;
		outline: none;
		font: inherit;
		color: inherit;
		transition: background-color 0.2s ease-in-out;
	}

	input[type='text'],
	input[type='number'] {
		padding: 0.7rem 1.4rem;
		border-radius: 2rem;
		background-color: var(--bg-3);

		&:focus {
			background-color: var(--bg-2);
		}
	}
</style>
