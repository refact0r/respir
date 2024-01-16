<script>
	import BreathePage from '../BreathePage.svelte';

	let exercise = {
		name: 'Box Breathing',
		description: '',
		cycles: 3,
		animation: 'box',
		routine: [
			{
				name: 'breathe in',
				duration: 4,
				type: 'in'
			},
			{
				name: 'hold',
				duration: 4,
				type: 'hold'
			},
			{
				name: 'breathe out',
				duration: 4,
				type: 'out'
			},
			{
				name: 'hold',
				duration: 4,
				type: 'hold'
			}
		]
	};
</script>

<BreathePage {exercise} />
