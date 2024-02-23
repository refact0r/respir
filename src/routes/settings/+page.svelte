<script>
	import IconHouse from '~icons/ph/house-duotone';
	import IconReset from '~icons/ph/arrow-clockwise-duotone';
	import { preferences, defaultPreferences } from '$lib/stores/preferences.js';
</script>

<svelte:head>
	<title>respir: settings</title>
	<meta name="description" content="configure volume settings." />
</svelte:head>

<main>
	<div class="content">
		<div class="header">
			<a class="icon-button" href="/">
				<IconHouse style="font-size: 1.3rem;" />
			</a>
			<h1>settings</h1>
			<button
				class="icon-button"
				title="reset to default"
				on:click|preventDefault={() => {
					$preferences.darkMode = defaultPreferences.darkMode;
					$preferences.ambienceVolume = defaultPreferences.ambienceVolume;
					$preferences.speechVolume = defaultPreferences.speechVolume;
				}}
			>
				<IconReset style="font-size: 1.3rem;" />
			</button>
		</div>
		<div class="box">
			<!-- dark mode toggle -->
			<div class="row">
				<label for="darkMode">dark mode</label>
				<input type="checkbox" title="toggle dark mode" bind:checked={$preferences.darkMode} />
			</div>
			<div class="row">
				<label for="ambienceVolume">ambience volume</label>
				<input
					class="slider"
					type="range"
					min="0"
					max="1"
					step="0.05"
					title="change volume of ambient sounds"
					bind:value={$preferences.ambienceVolume}
				/>
			</div>
			<div class="row">
				<label for="speechVolume">speech volume</label>
				<input
					class="slider"
					type="range"
					min="0"
					max="1"
					step="0.05"
					title="change volume of voice"
					bind:value={$preferences.speechVolume}
				/>
			</div>
		</div>
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

	button {
		margin-left: auto;
	}

	.box {
		padding: 1.5rem 1.5rem;
		border-radius: 2rem;
		background-color: var(--bg-2);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		backdrop-filter: blur(6px);
	}

	.row {
		display: flex;
		align-items: center;
		gap: 2rem;
		justify-content: space-between;
	}

	label {
		max-width: 10rem;
	}

	.slider {
		width: 15rem;
		background: none;
	}

	/* customize dark mode toggle */
	input[type='checkbox'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 28px;
		height: 14px;
		border-radius: 1rem;
		background-color: var(--bg-3);
		position: relative;
		cursor: pointer;
		transition: background-color 0.3s;
	}
	input[type='checkbox']:before {
		box-sizing: border-box;
		content: '';
		position: absolute;
		width: 20px;
		height: 20px;
		border: 2px solid var(--txt);
		background-color: var(--bg-3);
		backdrop-filter: blur(3px);
		border-radius: 50%;
		top: -3px;
		left: -3px;
		transition: left 0.3s;
	}
	input[type='checkbox']:checked {
		background-color: var(--txt);
	}
	input[type='checkbox']:checked:before {
		left: 14px;
	}

	input[type='range'],
	::-webkit-slider-thumb {
		-webkit-appearance: none;
	}
	::-moz-range-thumb {
		box-sizing: border-box;
		width: 20px;
		height: 20px;
		border: 2px solid var(--txt);
		background-color: var(--bg-3);
		backdrop-filter: blur(3px);
		border-radius: 50%;

		&:hover {
			cursor: pointer;
		}
	}
	::-webkit-slider-thumb {
		box-sizing: border-box;
		width: 20px;
		height: 20px;
		border: 2px solid var(--txt);
		background-color: var(--bg-3);
		backdrop-filter: blur(3px);
		border-radius: 50%;
		margin-top: calc(-0.5rem + 1px);

		&:hover {
			cursor: pointer;
		}
	}
	::-moz-range-progress {
		background-color: var(--txt);
		height: 4px;
		border-radius: 2px;

		&:hover {
			cursor: pointer;
		}
	}
	::-webkit-slider-runnable-track {
		background-color: var(--bg-3);
		height: 4px;
		border-radius: 2px;

		&:hover {
			cursor: pointer;
		}
	}
	::-moz-range-track {
		background-color: var(--bg-3);
		height: 4px;
		border-radius: 2px;

		&:hover {
			cursor: pointer;
		}
	}
</style>
