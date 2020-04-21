import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import {
	REQUEST_FRIEND,
	HANDLE_REQUEST,
	FETCH_FRIENDS,
	FETCH_REQUESTEE,
	FETCH_REQUESTOR
} from '../../query/friends_query'
import { FETCH_USERS } from '../../query/user_query'

import { FriendsContainer, SearchDropdown, SearchPosition } from './style'
import { Requests } from '../../components/Requests/Requests'

interface User {
	email: string
}

export const Friends = (): JSX.Element => {
	const [searchTerm, setSearchTerm] = useState<string>()
	const [request] = useMutation(REQUEST_FRIEND)
	const [getUsers, { data: users }] = useLazyQuery(FETCH_USERS)
	const [fetchRequestee, { data: requestees }] = useLazyQuery(FETCH_REQUESTEE)
	const [fetchRequestor, { data: requestors }] = useLazyQuery(FETCH_REQUESTOR)
	const [fetchFriends, { data: friends }] = useLazyQuery(FETCH_FRIENDS)

	const [handleRequest] = useMutation(HANDLE_REQUEST)

	useEffect(() => {
		fetchRequestee()
		fetchRequestor()
		fetchFriends()
	}, [])

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
		setSearchTerm(e.currentTarget.value)

		const { value } = e.currentTarget

		if (value.length < 1) return

		getUsers({
			variables: {
				searchTerm: value
			}
		})
	}

	const handleFriendRequest = (email: string): void => {
		request({
			variables: {
				friend: email
			},
			refetchQueries: [{ query: FETCH_REQUESTEE }, { query: FETCH_REQUESTOR }, { query: FETCH_FRIENDS }]
		})
	}

	const handleRequestClick = (id: number, email: string, state: string): void => {
		handleRequest({
			variables: {
				id: id,
				email: email,
				state: state
			},
			refetchQueries: [{ query: FETCH_REQUESTEE }]
		})
	}

	return (
		<FriendsContainer>
			<input onChange={(e): void => handleInputChange(e)} value={searchTerm} placeholder="search for friends" />
			<SearchPosition>
				{searchTerm && searchTerm.length > 0 && (
					<SearchDropdown>
						<ul>
							{users?.fetchUsers.map((user: User, index: number) => {
								return (
									<li key={index}>
										<span>{user.email}</span>
										<button
											type="button"
											onClick={(): void => handleFriendRequest(user.email)}
											disabled={requestees.fetchRequestee.some(
												(i: any) => i.requestee === user.email
											)}
										>
											{requestees.fetchRequestee.some((i: any) => i.requestee === user.email)
												? 'pending'
												: 'add'}
										</button>
									</li>
								)
							})}
						</ul>
					</SearchDropdown>
				)}
			</SearchPosition>
			<div>
				<h5>Friends</h5>
				<ul>
					{friends?.fetchFriends.map((friend: User, index: number) => {
						return <li key={index}>{friend.email}</li>
					})}
				</ul>
			</div>
			<div>
				<h5>Waiting for reply</h5>
				<Requests list={requestees?.fetchRequestee} handleClick={handleRequestClick} target="requestee" />
			</div>
			<div>
				<h5>Friend requests</h5>
				<Requests list={requestors?.fetchRequestor} handleClick={handleRequestClick} target="requestor" />
			</div>
		</FriendsContainer>
	)
}
