<script>
	import '../app.scss';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	export let data;
</script>

<div class="app">
	{#key data.pathname}
		<div class="main" in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200 }}>
			<slot />
		</div>
	{/key}
	<section class="sticky">
		<div class="bubbles">
			{#each Array(13) as _, i}
				<div class="bubble"></div>
			{/each}
		</div>
	</section>
</div>

<style lang="scss">
	.app {
		height: 100%;
		min-height: 100vh;
	}

	.main {
		height: 100%;
		min-height: 100vh;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding: 1.5rem 0;
	}

	.sticky {
		margin: 0;
		padding: 0;
	}

	.bubbles {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: hidden;
		top: 0;
		left: 0;
		z-index: -2;
	}
	.bubble {
		position: absolute;
		bottom: -100px;
		width: 40px;
		height: 40px;
		background-color: var(--bg-0);
		border-radius: 50%;
		animation: rise 10s infinite ease-in;
	}
	.bubble:nth-child(1) {
		width: 40px;
		height: 40px;
		left: 10%;
		animation-duration: 10s;
	}
	.bubble:nth-child(2) {
		width: 20px;
		height: 20px;
		left: 20%;
		animation-duration: 7s;
		animation-delay: 1s;
	}
	.bubble:nth-child(3) {
		width: 50px;
		height: 50px;
		left: 35%;
		animation-duration: 9s;
		animation-delay: 2s;
	}
	.bubble:nth-child(4) {
		width: 80px;
		height: 80px;
		left: 50%;
		animation-duration: 13s;
		animation-delay: 0s;
	}
	.bubble:nth-child(5) {
		width: 35px;
		height: 35px;
		left: 55%;
		animation-duration: 8s;
		animation-delay: 1s;
	}
	.bubble:nth-child(6) {
		width: 45px;
		height: 45px;
		left: 65%;
		animation-duration: 10s;
		animation-delay: 3s;
	}
	.bubble:nth-child(7) {
		width: 90px;
		height: 90px;
		left: 70%;
		animation-duration: 14s;
		animation-delay: 2s;
	}
	.bubble:nth-child(8) {
		width: 25px;
		height: 25px;
		left: 80%;
		animation-duration: 8s;
		animation-delay: 2s;
	}
	.bubble:nth-child(9) {
		width: 15px;
		height: 15px;
		left: 70%;
		animation-duration: 7s;
		animation-delay: 1s;
	}
	.bubble:nth-child(10) {
		width: 90px;
		height: 90px;
		left: 25%;
		animation-duration: 12s;
		animation-delay: 4s;
	}
	@keyframes rise {
		0% {
			bottom: -100px;
			transform: translateX(0);
		}
		50% {
			transform: translate(100px);
		}
		100% {
			bottom: 1080px;
			transform: translateX(-200px);
		}
	}
</style>
