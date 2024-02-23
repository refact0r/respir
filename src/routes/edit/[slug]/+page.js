import { customs } from '$lib/stores/exercises.js';
import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

export async function load({ params }) {
	const { slug } = params;
	const customsList = get(customs);

	if (parseInt(slug) < customsList.length) {
		return { index: parseInt(slug) };
	}

	throw error(404, 'Exercise not found');
}
