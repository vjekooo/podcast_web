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

export const GET_PODCASTS = gql`
	query Podcasts {
		podcasts {
			id,
			url
		}
	}
`

export const SET_FAVORITE = gql`
	mutation Favorite($title: String!, $description: String!, $url: String!) {
		setFavorite(title: $title, description: $description, url: $url)
	}
`

export const GET_FAVORITES = gql`
	query Favorites {
		favorites {
			id
			description
			title
			url
		}
	}
`
