<script>
	import IconHouse from '~icons/ph/house-duotone';
	import IconPlus from '~icons/ph/plus';
	import { goto } from '$app/navigation';
	import { customs } from '$lib/stores/exercises.js';

	let customName;
	let customDesc;
	let customCycles = 10;
	let customBID = 4;
	let customBIHD = 4;
	let customBOD = 4;
	let customBOHD = 4;

	function addCustomPreset() {
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

		if (customBIHD > 0) {
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
		if (customBOHD > 0) {
			custom.routine.push({
				name: 'hold',
				duration: customBOHD,
				type: 'hold'
			});
		}

		$customs = [...$customs, custom];
		goto('/');
	}
</script>

<svelte:head>
	<title>respir: create</title>
	<meta name="description" content="" />
</svelte:head>

<main>
	<div>
		<div class="header">
			<a class="icon-button" href="/">
				<IconHouse style="font-size: 1.3rem;" />
			</a>
			<h1>create custom exercise</h1>
		</div>
		<form on:submit|preventDefault={() => addCustomPreset()}>
			<div class="box">
				<div class="row">
					<div class="group">
						<label for="name">name</label>
						<br />
						<input
							type="text"
							name="name"
							title="name"
							minlength="1"
							maxlength="20"
							required
							bind:value={customName}
						/>
					</div>
					<div class="group cycles">
						<label for="cycles">cycles</label>
						<br />
						<input
							type="number"
							name="cycles"
							title="number of cycles"
							min="1"
							step="1"
							required
							bind:value={customCycles}
						/>
					</div>
				</div>
				<div class="group">
					<label for="description">description</label>
					<br />
					<input
						type="text"
						name="description"
						title="description"
						maxlength="50"
						bind:value={customDesc}
					/>
				</div>
				<div class="row">
					<div class="group">
						<label for="bid">breathe in duration </label>
						<br />
						<input
							type="number"
							name="bid"
							title="breathe in duration"
							min="1"
							step="1"
							required
							bind:value={customBID}
						/>
					</div>
					<div class="group">
						<label for="bihd">breathe in hold duration </label>
						<br />
						<input
							type="number"
							name="bihd"
							title="breathe in hold duration (set this to zero for no hold)"
							min="0"
							step="1"
							required
							bind:value={customBIHD}
						/>
					</div>
				</div>
				<div class="row">
					<div class="group">
						<label for="bod">breathe out duration </label>
						<br />
						<input
							type="number"
							name="bod"
							title="breathe out duration"
							min="1"
							step="1"
							required
							bind:value={customBOD}
						/>
					</div>
					<div class="group">
						<label for="bohd">breathe out hold duration </label>
						<br />
						<input
							type="number"
							name="bohd"
							title="breathe out hold duration (set this to zero for no hold)"
							min="0"
							step="1"
							required
							bind:value={customBOHD}
						/>
					</div>
				</div>
				<div class="row">
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
	}

	.row {
		display: flex;
		gap: 1rem;
	}

	.group {
		width: 100%;

		&.cycles {
			width: 30%;
		}
	}

	button {
		margin-left: auto;
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
