import { exercises } from '$lib/exercises.js';

export async function load({ params }) {
	const exercise = exercises[params.slug];
	if (exercise) {
		return { exercise };
	}
}
