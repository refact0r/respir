import { customs } from '$lib/stores/exercises.js';
import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';

export const ssr = false;

export async function load({ params }) {
	const { slug } = params;
	const customsList = get(customs);
	const exercise = customsList[slug];

	if (exercise) {
		return { exercise };
	}

	throw error(404, 'Exercise not found');
}
