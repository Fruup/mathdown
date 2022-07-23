<script lang="ts">
	import { browser } from '$app/env'
	import {
		clampSeparatorPosition,
		separatorPosition as storedSeparatorPosition,
	} from '$lib/store'

	function handleMouseMove(e: MouseEvent) {
		const f = (e.clientX - container.offsetLeft) / container.clientWidth
		separatorPosition = clampSeparatorPosition(f)
	}

	function handleMouseDown(e: MouseEvent) {
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)

		dragging = true
	}

	function handleMouseUp(e: MouseEvent) {
		window.removeEventListener('mousemove', handleMouseMove)

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
</script>

<div bind:this={container} class="container">
	<div class="col1" style:width={100 * separatorPosition + '%'}>
		<slot name="col1" />
	</div>

	<div
		class="separator"
		style:left={100 * separatorPosition + '%'}
		on:mousedown={handleMouseDown}
	>
		<svg width="100%" height="100%">
			<line
				x1="50%"
				y1="0"
				x2="50%"
				y2="100%"
				stroke="black"
				stroke-width="2"
			/>
		</svg>
	</div>

	<div class="col2" style:width={100 - 100 * separatorPosition + '%'}>
		<slot name="col2" />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;

		/* align-items: stretch; */

		width: 100%;
		height: 100%;
	}

	.col1,
	.col2 {
		/* overflow-y: auto; */
	}

	.separator {
		position: absolute;

		width: 20px;
		height: 100%;
		transform: translateX(-50%);

		cursor: e-resize;

		z-index: 1;

		stroke-opacity: 0.5;
		transition: stroke-opacity 200ms ease-in-out;
	}

	.separator:hover {
		stroke-opacity: 0.75;
	}

	.separator::before {
		position: absolute;
		content: '';
		top: 0;
		left: 50%;
		bottom: 0;
		right: 0;

		transform: translateX(-50%);

		background: linear-gradient(
			0.25turn,
			transparent,
			rgba(0, 132, 255, 0.226),
			transparent
		);

		opacity: 0;
		transition: opacity 200ms ease-in-out;

		z-index: -1;
	}

	.separator:hover::before {
		opacity: 1;
	}
</style>
