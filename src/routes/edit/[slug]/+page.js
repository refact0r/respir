import { presets, customs } from '$lib/stores/exercises.js';
import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

export async function load({ params }) {
	const { slug } = params;

	console.log(get(presets), get(customs));

	const presetList = get(presets);
	const presetIndex = presetList.findIndex((preset) => preset.id === slug);

	if (presetIndex > -1) {
		return { index: presetIndex, custom: false };
	}

	const customList = get(customs);
	const customIndex = customList.findIndex((custom) => custom.id === slug);

	if (customIndex > -1) {
		return { index: customIndex, custom: true };
	}

	throw error(404, 'Exercise not found');
}
