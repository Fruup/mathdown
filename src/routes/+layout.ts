import type { Load } from './$types'
import { darkMode } from '$lib/store'

export const load: Load = async ({ url }) => {
	const param = url.searchParams.get('dark')
	const dark: boolean = param ? JSON.parse(param) : true

	darkMode.set(dark)
}
