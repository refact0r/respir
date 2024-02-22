<script>
	import IconHouse from '~icons/ph/house-duotone';
	import IconReset from '~icons/ph/arrow-clockwise-duotone';
	import { preferences, defaultPreferences } from '$lib/stores/preferences.js';
</script>

<svelte:head>
	<title>respir: settings</title>
	<meta name="description" content="" />
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
				on:click|preventDefault={() => preferences.set(defaultPreferences)}
			>
				<IconReset style="font-size: 1.3rem;" />
			</button>
		</div>
		<div class="box">
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
	}

	.row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	label {
		width: 20rem;
	}

	.slider {
		width: 100%;
		background: none;
	}

	::-moz-range-thumb {
		border: 2.5px solid var(--txt);
		background-color: var(--bg-3);
		backdrop-filter: blur(3px);
		border-radius: 50%;
	}
	::-moz-range-progress {
		background-color: var(--txt);
		height: 2.5px;
		border-radius: 2px;
	}
	::-moz-range-track {
		background-color: var(--bg-3);
		height: 2.5px;
		border-radius: 2px;
	}
</style>
