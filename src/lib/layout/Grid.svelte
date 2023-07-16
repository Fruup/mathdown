<script lang="ts">
	import { browser } from '$app/environment'
	import {
		clampSeparatorPosition,
		separatorPosition as storedSeparatorPosition,
	} from '$lib/store'

	function handleMouseMove(e: PointerEvent) {
		const f = (e.clientX - 10 - container.offsetLeft) / container.clientWidth
		separatorPosition = clampSeparatorPosition(f)
	}

	function handleMouseDown(e: PointerEvent) {
		window.addEventListener('pointermove', handleMouseMove)
		window.addEventListener('pointerup', handleMouseUp)

		dragging = true
	}

	function handleMouseUp(e: PointerEvent) {
		window.removeEventListener('pointermove', handleMouseMove)

		dragging = false
		$storedSeparatorPosition = separatorPosition
	}

	let separatorPosition: number = $storedSeparatorPosition
	let container: HTMLDivElement
	let dragging = false

	$: if (typeof document !== 'undefined') {
		document.body.style.cursor = dragging ? 'e-resize' : 'initial'
	}

	$: if (browser) document.body.style.userSelect = dragging ? 'none' : 'initial'

	$: columns = `${100 * separatorPosition}% 16px ${
		100 - 100 * separatorPosition
	}%`
</script>

<div
	bind:this={container}
	class="container"
	style:grid-template-columns={columns}
>
	<div class="col1">
		<slot name="col1" />
	</div>

	<div class="separator" on:pointerdown={handleMouseDown}>
		<div class="separator-line" />
	</div>

	<div class="col2">
		<slot name="col2" />
	</div>
</div>

<style>
	.container {
		display: grid;

		width: 100%;
		min-height: 100%;
	}

	.col1,
	.col2 {
		overflow-y: auto;
	}

	.separator {
		position: relative;

		text-align: center;

		height: 100%;

		cursor: e-resize;

		z-index: 1;
	}

	.separator::before {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		background: linear-gradient(
			0.25turn,
			transparent,
			rgba(0, 132, 255, 0.226),
			transparent
		);

		opacity: 0;

		z-index: -1;
	}

	.separator:hover::before {
		opacity: 1;
	}

	.separator::before,
	.separator-line {
		transition: opacity 200ms ease-in-out;
	}

	.separator-line {
		width: 2px;
		height: 100%;
		background-color: var(--text-color);
		margin: auto;
		opacity: 0.5;
	}
	
	.separator:hover .separator-line {
		opacity: .75;
	}
</style>
