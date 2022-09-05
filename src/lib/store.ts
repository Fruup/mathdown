import { browser } from '$app/env'
import { writable } from 'svelte/store'

export function clampSeparatorPosition(value: number): number {
	return Math.max(Math.min(value, 0.75), 0.25)
}

export const separatorPosition = (() => {
	const STORAGE_KEY = 'separatorPosition'
	const DEFAULT_VALUE = 0.5

	let initial: number

	if (browser) {
		const stored = localStorage.getItem(STORAGE_KEY)
		initial = clampSeparatorPosition(
			typeof stored === 'string' ? parseFloat(stored) : DEFAULT_VALUE
		)
	}

	const store = writable<number>(initial)

	if (browser) {
		store.subscribe((value) => {
			localStorage.setItem(STORAGE_KEY, value.toString())
		})
	}

	return store
})()

export const darkMode = (() => {
	const init = browser
		? !!JSON.parse(localStorage.getItem('dark') ?? 'true')
		: true
	return writable<boolean>(init)
})()

export const showProjectsOverlay = writable(false)
export const showProjectNameOverlay = writable(false)
