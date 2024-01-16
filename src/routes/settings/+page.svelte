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
	<br />
	<div class="sliders">
		<label for="ambienceVolume">Ambience Volume:</label>
		<input
			type="range"
			min="0"
			max="1"
			step="0.1"
			bind:value={$ambienceVolume}
			on:input={handleAmbienceVolumeChange}
		/>

		<label for="speechVolume">Speech Volume:</label>
		<input
			type="range"
			min="0"
			max="1"
			step="0.1"
			bind:value={$speechVolume}
			on:input={handleSpeechVolumeChange}
		/>
	</div>
	<a href="/" class="icon-button"><IconCheck style="font-size: 1.5rem;" /></a>
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
		border-radius: 2rem;
		background-color: var(--bg-2);
	}

	.icon-button {
		margin-top: 20px;
	}
</style>
