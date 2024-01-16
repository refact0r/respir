<script>
	import BreathePage from '../BreathePage.svelte';

	let exercise = {
		name: '4-7-8 Breathing',
		description: '',
		cycles: 3,
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
				name: 'breathe in',
				duration: 4,
				type: 'in'
			},
			{
				name: 'breathe out',
				duration: 8,
				type: 'out'
			},
			{
				name: 'hold',
				duration: 5,
				type: 'hold'
			}
		]
	};
</script>

<BreathePage {exercise} />
