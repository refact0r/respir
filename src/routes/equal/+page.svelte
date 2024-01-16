<script>
	import BreathePage from '../BreathePage.svelte';

	let exercise = {
		name: 'Equal Breathing',
		description: '',
		cycles: 10,
		animation: 'circle',
		routine: [
			{
				name: 'breathe in',
				duration: 4,
				type: 'in'
			},
			{
				name: 'breathe out',
				duration: 4,
				type: 'out'
			}
		]
	};
</script>

<BreathePage {exercise} />
