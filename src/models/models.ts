
export interface Podcast {
	feedUrl: string;
	collectionId: string;
	artworkUrl100: string;
}

export interface Episode {
	id?: number;
	title: string;
	description: string;
	url: string;
	pubDate: string;
	duration: string;
}

export interface Favorite {
	id: number;
	title: string;
	description: string;
	url: string;
}
