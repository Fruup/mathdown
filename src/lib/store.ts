import { browser } from "$app/env";
import { writable } from "svelte/store";

export const code = (() => {
	const STORAGE_KEY = 'code'

	const store = writable<string>(undefined, (set) => {
		console.log('notifier')
	})

	let timer: NodeJS.Timeout

	// on updated
	store.subscribe((value) => {
		if (typeof localStorage === 'undefined') return

		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			// localStorage.setItem(STORAGE_KEY, value)
		}, 1000)
	})
	
	return {
		...store,
	}
})()

export const html = (() => {
	const store = writable<string>('')

	return {
		...store,
	}
})()

export function clampSeparatorPosition(value: number): number {
	return Math.max(Math.min(value, .75), .25)
}

export const separatorPosition = (() => {
	const STORAGE_KEY = 'separatorPosition'
	const DEFAULT_VALUE = .5

	let initial: number

	if (browser) {
		const stored = localStorage.getItem(STORAGE_KEY)
		initial = clampSeparatorPosition(
			typeof stored === 'string' ?
				parseFloat(stored) :
				DEFAULT_VALUE
		)
	}

	const store = writable<number>(initial)

	if (browser) {
		store.subscribe((value) => {
			console.log('updated', value)
			localStorage.setItem(STORAGE_KEY, value.toString())
		})
	}

	return store
})()
