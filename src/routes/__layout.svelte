<slot />

<style global>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');
	
	html {
		height: 100vh;

		font-family: 'Cascadia Code', sans-serif;
		font-size: 1.2rem;
	}
	
	* {
		box-sizing: border-box;
	}

	body {
		width: 100%;
		height: calc(100vh - 1rem);
		height: 100%;

		overflow: hidden;

		/* padding: .5rem; */
		margin: 0;

		user-select: none;
	}

	div#svelte {
		width: 100%;
		height: 100%;
	}
</style>
