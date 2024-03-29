import { browser } from '$app/environment'
import { download } from '$lib/components/Downloader.svelte'
import { writable } from 'svelte/store'

export type Project = {
	id: string
	name?: string
	code: string
	createdAt?: string
}

export type StoredProject = Required<Project>

export const generateProjectId = (length = 4): string =>
	Math.floor(Math.random() * Math.pow(16, length))
		.toString(16)
		.padStart(length, '0')

export const storeProject = (project: Project): void => {
	if (!project.createdAt || !project.name)
		throw Error(`Invalid project! (${JSON.stringify(project)})`,)

	const json = JSON.stringify(project, undefined, 2)
	localStorage.setItem('project-' + project.id, json)

	storedProjects.load()

	projectSaved.set(true)
}

export const loadProject = (id: string): StoredProject | undefined => {
	const loaded = localStorage.getItem('project-' + id)

	if (loaded) return JSON.parse(loaded)
}

export const exportProject = (project: StoredProject): void => {
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
		})

	reset()

	return {
		...store,
		reset,
	}
})()

export const storedProjects = (() => {
	const store = writable<StoredProject[]>([])

	const load = () => {
		store.set(
			Array.from(Array(localStorage.length), (_, i) => localStorage.key(i))
				.filter((k) => k.startsWith('project-'))
				.map((k) => JSON.parse(localStorage.getItem(k)) as StoredProject)
		)
	}

	if (browser) load()

	return {
		...store,
		load,
	}
})()

export const projectSaved = writable(false)
