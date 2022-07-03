<script>
	import { browser } from "$app/env"

	function toggleDarkMode() {
		if (!browser) return

		if (document.body.classList.contains('dark'))
			document.body.classList.remove('dark')
		else
			document.body.classList.add('dark')
	}
</script>

<button on:click={toggleDarkMode}>
	DARK
</button>

<slot />

<style global>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400;700&display=swap');

	html {
		height: 100vh;

		font-family: 'Cascadia Code', 'Source Code Pro', 'Open Sans', sans-serif;
		font-size: 1.2rem;
	}
	
	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		padding: 0;

		--text-color: #111;
		--background-color: #fff;
	}

	body.dark {
		--text-color: #eee;
		--background-color: rgb(50, 50, 50);
	}

	body,
	textarea {
		color: var(--text-color);
		background-color: var(--background-color);

		transition-property: color background-color;
		transition-duration: 500ms;
		transition-timing-function: ease-out;
	}
</style>
