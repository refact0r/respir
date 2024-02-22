import { persisted } from 'svelte-persisted-store';

export const customs = persisted('customs', []);
export const presets = persisted('presets', [
	{
		id: 'equal',
		name: 'equal breathing',
		description: 'helps you relax and focus',
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
	},
	{
		id: '4-7-8',
		name: '4-7-8 breathing',
		description: 'promotes relaxation and better sleep',
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
	},
	{
		id: 'box',
		name: 'box breathing',
		description: 'relieves stress and improves mood',
		cycles: 10,
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
	}
]);
