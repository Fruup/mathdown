<script lang="ts">
	export let label: string
	export let name: string = label
	export let checked: boolean = false
</script>

<div>
	<input type="checkbox" name={name} bind:checked>
	<label for={name}>{label}</label>
</div>

<style>
	div {
		display: flex;
		flex-direction: row;

		align-items: center;

		font-size: .75em;
	}
</style>
