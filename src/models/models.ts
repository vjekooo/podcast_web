
export interface Podcast {
	feedUrl: string;
	collectionId: string;
	artworkUrl100: string;
}

export interface Episode {
	title: string;
	description: string;
	url: string;
}

export interface Favorite {
	id: number;
	title: string;
	description: string;
	url: string;
}
