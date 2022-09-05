import { browser } from '$app/env'
import { storedProjects } from '$lib/project'
import { error } from '@sveltejs/kit'
import { get } from 'svelte/store'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = ({ params }) => {
	if (!browser) return

	if (get(storedProjects).findIndex((p) => p.id === params.id) < 0)
		throw error(404, `Project with id '${params.id}' does not exist!`)
}
