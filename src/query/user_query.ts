
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

export const USER_SETTINGS = gql`
	query UserSettings {
		userSettings {
			theme
		}
	}
`

export const USER_PROFILE = gql`
	query USER_PROFILE {
		userProfile {
			email
		}
	}
`

export const SET_THEME = gql`
	mutation setTheme($theme: String!) {
		setTheme(theme: $theme)
	}
`

export const LOGOUT = gql`
	mutation Logout($token: String!) {
		logout(token: $token)
	}
`

export const FETCH_USERS = gql`
	query FetchUsers($searchTerm: String!) {
		fetchUsers(searchTerm: $searchTerm) {
			email
		}
	}
`

// export const TEST = gql`
// 	subscription ()
// `
