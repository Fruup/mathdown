export type Project = {
	id: string,
	name: string,
	code: string,
}

export function importProject(): Project {
	
}

export function exportProject(project: Project): Blob {
	const json = JSON.stringify(project)
	return new Blob([json], {
		type: 'application/json',
	})
}
