<script>
	import './app.scss';
</script>

<div class="app">
	<slot />
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 100vh;
	}
</style>
