<script>
	import { page } from '$app/stores'
</script>

<a href="/" class="container">
	<div>
		<p class="whoops">Whoops! {$page.status}!</p>
		<p class="message">{$page.error.message ?? $page.error}!</p>
		<p class="shoo">And now shoo!</p>
	</div>
</a>

<style>
	div {
		text-align: center;
		max-width: 500px;
		padding: 0 1rem;
	}

	.container {
		height: 100%;

		display: grid;
		place-items: center;
	}

	p {
		margin: 0;
	}

	.whoops {
		font-size: 3rem;
	}

	.shoo {
		text-decoration: underline;
	}

	a {
		text-decoration: none;
		color: var(--text-color);
	}
</style>
