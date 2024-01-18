import { exercises } from '$lib/exercises.js';
import { presets } from '$lib/custom-presets.js';

export async function load({ params }) {
	const exercise = exercises[params.slug];
	if (exercise) {
		return { exercise };
	}
	else {
		const exercise = presets[params.slug];
		if (exercise) {
			return { exercise };
		}
	}
}
