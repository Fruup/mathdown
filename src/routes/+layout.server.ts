import type { LayoutServerLoad } from './$types'
import { darkMode } from '$lib/store'

export const load: LayoutServerLoad = ({ cookies }) => {
	darkMode.set(cookies.get('dark') === 'true')
}
