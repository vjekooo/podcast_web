export interface Podcast {
	feedUrl: string
	collectionId: string
	artworkUrl100: string
}

export interface Episode {
	id?: number
	title: string
	description: string
	url: string
	pubDate: string
	duration: string
	image?: string
}

export interface Favorite {
	id: number
	title: string
	description: string
	url: string
	pubDate: string
	duration: string
	image?: string
}

export interface LooseObject {
	[key: string]: string
}

export interface Token {
	iat: number
	exp: number
}
