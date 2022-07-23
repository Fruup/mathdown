export type Project = {
	id: string,
	name: string,
	chapters: Chapter[],
}

export type Chapter = {
	id: string,
	code: string,
}
