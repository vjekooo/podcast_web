import { gql } from 'apollo-boost'

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			accessToken
		}
	}
`

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!) {
		register(email: $email, password: $password)
	}
`

export const GET_USER = gql`
	query User {
		user
	}
`

export const SUBSCRIBE = gql`
	mutation Subscribe($url: String!) {
		subscribe(url: $url)
	}
`

export const UNSUBSCRIBE = gql`
	mutation Unsubscribe($url: String!) {
		unsubscribe(url: $url)
	}
`

export const GET_PODCASTS = gql`
	query Podcasts {
		podcasts {
			id,
			url
		}
	}
`

export const SET_FAVORITE = gql`
	mutation Favorite(
		$title: String!,
		$description: String!,
		$url: String!,
		$duration: String!,
		$pubDate: String!
	) {
		setFavorite(
			title: $title,
			description: $description,
			url: $url,
			duration: $duration,
			pubDate: $pubDate
		)
	}
`

export const REMOVE_FAVORITE = gql`
	mutation RemoveFavorite($id: ID!) {
		removeFavorite(id: $id)
	}
`

export const GET_FAVORITES = gql`
	query Favorites {
		favorites {
			id
			description
			title
			url,
			duration,
			pubDate
		}
	}
`

export const FETCH_PODCASTS = gql`
	query FetchPodcasts($urls: [String!]!) {
		fetchPodcasts(urls: $urls) {
			url,
			title,
			pubDate,
			description,
			image
		}
	}
`

export const FETCH_PODCASTS_EPISODES = gql`
	query FetchPodcastsEpisodes($urls: String!) {
		fetchPodcastsEpisodes(urls: $urls) {
			url,
			title,
			pubDate,
			description,
			image,
			episodes {
				title,
				description,
				pubDate,
				url,
				duration
			}
		}
	}
`

export const LOGOUT = gql`
	mutation Logout($token: String!) {
		logout(token: $token)
	}
`
