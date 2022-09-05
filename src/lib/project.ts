import { browser } from '$app/env'
import { download } from '$lib/components/Downloader.svelte'
import { writable } from 'svelte/store'

export type Project = {
	id: string
	name: string
	code: string
	createdAt?: string
}

export const generateProjectId = (length = 4): string =>
	Math.floor(Math.random() * Math.pow(16, length))
		.toString(16)
		.padStart(length, '0')

export const storeProject = (project: Project): void => {
	const json = JSON.stringify(project, undefined, 2)
	localStorage.setItem('project-' + project.id, json)

	storedProjects.load()
}

export const loadProject = (id: string): Project | undefined => {
	const loaded = localStorage.getItem('project-' + id)

	if (loaded) return JSON.parse(loaded)
}

export const exportProject = (project: Project): void => {
	const filename = project.name
		.split(' ')
		.map((s) => s.toLowerCase())
		.join('-')
		.concat('.json')

	const json = JSON.stringify(project, undefined, 2)
	const data = new Blob([json], {
		type: 'application/json',
	})

	download(data, filename)
}

export const currentProject = (() => {
	const store = writable<Project>()

	const reset = () =>
		store.set({
			id: generateProjectId(),
			code: '',
			name: '',
			createdAt: new Date().toISOString(),
		})

	reset()

	return {
		...store,
		reset,
	}
})()

export const storedProjects = (() => {
	const store = writable<Project[]>([])

	const load = () => {
		store.set(
			Array.from(Array(localStorage.length), (_, i) => localStorage.key(i))
				.filter((k) => k.startsWith('project-'))
				.map((k) => JSON.parse(localStorage.getItem(k)) as Project)
		)
	}

	if (browser) load()

	return {
		...store,
		load,
	}
})()
