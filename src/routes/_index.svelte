<script lang="ts">
	export let code: string = "";
	export let rendered: string = "";

	var timer: NodeJS.Timeout;

	async function sendRequest() {
		const res = await fetch("/api/v1/render", {
			method: "post",
			body: code,
		});

		rendered = await res.text();
	}

	function handleInput() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}

		timer = setTimeout(sendRequest, 500);
	}
</script>

<main>
	<textarea
		name="code"
		id="code"
		rows="5"
		bind:value={code}
		on:input={handleInput}
	/>
	<div>
		{@html rendered}
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;

		max-width: 800px;
		width: 100%;
		height: 100%;

		text-align: center;
		margin: 0 auto;

		--border-radius: 8px;
	}

	textarea,
	div {
		width: 100%;
		height: 100%;

		padding: 1rem;
		margin: 0;

		text-align: left;

		border: 1px solid grey;
		border-radius: 0;

		font-size: 1rem;
		font-family: monospace;
	}

	textarea {
		border-top-left-radius: var(--border-radius);
		border-bottom-left-radius: var(--border-radius);
	}

	div {
		border-top-right-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);

		background-color: #3f3f3f;
		color: white;
	}
</style>
