import { presets } from '$lib/stores/exercises.js';
import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

export async function load({ params }) {
	const { slug } = params;
	const presetList = get(presets);
	const exercise = presetList.find((preset) => preset.id === slug);

	if (exercise) {
		return { exercise };
	}

	throw error(404, 'Exercise not found');
}
