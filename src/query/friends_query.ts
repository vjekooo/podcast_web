
import { gql } from 'apollo-boost'

export const REQUEST_FRIEND = gql`
	mutation RequestFriend($friend: String!) {
		requestFriend(friend: $friend)
	}
`

export const FETCH_FRIENDS = gql`
	query FetchFriends {
		fetchFriends {
			email
		}
	}
`

export const FETCH_REQUESTEE = gql`
	query FetchRequestee {
		fetchRequestee {
			id,
			requestee
		}
	}
`

export const FETCH_REQUESTOR = gql`
	query FetchRequestor {
		fetchRequestor {
			id,
			requestor
		}
	}
`

export const HANDLE_REQUEST = gql`
	mutation HandleRequest($id: Number!, $email: String!, $state: String!) {
		handleRequest(id: $id, email: $email, state: $state)
	}
`
