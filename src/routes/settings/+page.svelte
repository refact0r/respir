<script>
	import IconCheck from '~icons/ph/check-bold';
	import { ambienceVolume, speechVolume } from '../../lib/stores/volumeData.js';
	function handleAmbienceVolumeChange(event) {
		ambienceVolume.set(event.target.value);
	}
	function handleSpeechVolumeChange(event) {
		speechVolume.set(event.target.value);
	}
</script>

<svelte:head>
	<title>respir: settings</title>
	<meta name="description" content="" />
</svelte:head>

<main>
	<h1>settings</h1>
	<div class="sliders">
		<label for="ambienceVolume">Ambience Volume:</label>
		<input
			class="slider"
			type="range"
			min="0"
			max="1"
			step="0.05"
			title="change volume of ambient sounds"
			bind:value={$ambienceVolume}
			on:input={handleAmbienceVolumeChange}
		/>

		<label for="speechVolume">Speech Volume:</label>
		<input
			class="slider"
			type="range"
			min="0"
			max="1"
			step="0.05"
			title="change volume of voice"
			bind:value={$speechVolume}
			on:input={handleSpeechVolumeChange}
		/>
	</div>
	<a href="/" class="icon-button" title="submit settings and return home">
		<IconCheck style="font-size: 1.3rem;" />
	</a>
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

	label {
		display: block;
		margin-bottom: 10px;
	}

	.sliders {
		padding: 2rem;
		margin-top: 1rem;
		border-radius: 2rem;
		background-color: var(--bg-2);
	}

	.slider {
		appearance: none;
		width: 100%;
		height: 0.75rem;
		border-radius: 1rem;
		background: #ffffff;
		outline: none;
		opacity: 0.7;
		transition: opacity 0.2s;
	}
	.slider::-webkit-slider-thumb {
		appearance: none;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: hsl(179, 52%, 52%);
		cursor: pointer;
		transition: 0.2s;
	}
	.slider::-webkit-slider-thumb:hover {
		background: hsl(179, 48%, 42%);
	}
	.slider::-moz-slider-thumb {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: hsl(179, 52%, 52%);
		cursor: pointer;
		transition: 0.2s;
	}
	.slider::-moz-slider-thumb:hover {
		background: hsl(179, 48%, 42%);
	}

	.icon-button {
		margin-top: 20px;
	}
</style>
