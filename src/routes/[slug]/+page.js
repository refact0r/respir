import { presets, customs } from '$lib/stores/exercises.js';
import { get } from 'svelte/store';

export async function load({ params }) {
	const { slug } = params;
	const presetList = get(presets);
	const exercise = presetList.find((preset) => preset.id === slug);

	if (exercise) {
		return { exercise };
	}

	const customList = get(customs);
	const custom = customList.find((custom) => custom.id === slug);

	if (custom) {
		return { exercise: custom };
	}

	return {
		status: 404
	};
}
