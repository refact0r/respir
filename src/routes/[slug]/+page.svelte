<script>
	import Exercise from '$lib/components/Exercise.svelte';

	export let data;
</script>

<svelte:head>
	<title>respir: {data.name}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<Exercise {data} />
