<script>
	import BreathePage from '../BreathePage.svelte';

	let exercise = {
		name: '4-7-8 Breathing',
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
				name: 'hold',
				duration: 7,
				type: 'hold'
			},
			{
				name: 'breathe out',
				duration: 8,
				type: 'out'
			}
		]
	};
</script>

<BreathePage {exercise} />
