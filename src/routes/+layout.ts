import type { LayoutLoad } from './$types'
import { darkMode } from '$lib/store'
import { get } from 'svelte/store'

export const load: LayoutLoad = async ({ url }) => {
	const param = url.searchParams.get('dark')
	const dark: boolean = param ? JSON.parse(param) : get(darkMode)

	darkMode.set(dark)
}
