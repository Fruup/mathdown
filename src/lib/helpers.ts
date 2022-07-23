type Action = (...args: any[]) => any

export class DebouncedAction {
	readonly action: Action
	readonly time: number

	private timeout: NodeJS.Timeout

	constructor(action: Action, time: number) {
		this.action = action
		this.time = time
	}

	invoke() {
		this.clear()
		this.timeout = setTimeout(this.action, this.time)
	}

	clear() {
		if (this.timeout) {
			clearTimeout(this.timeout)
			this.timeout = undefined
		}
	}
}
