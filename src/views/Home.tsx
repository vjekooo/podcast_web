
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_USER = gql`
	query User {
		user
	}
`

// const GET_PODCASTS = gql`
// 	query podcasts() {
// 		podcasts
// 	}
// `

export const Home: React.FC = () => {
	const [podcasts] = useState([])
	const [user] = useState('')
	const { data } = useQuery(GET_USER)
	// const [fetchPodcasts] = useLazyQuery(GET_PODCASTS)

	useEffect(() => {
	}, [data])

	console.log(user)

	return (
		<div>
			<ul>
				{
					podcasts.map((podcast: any) => (
						<li
							key={podcast.id}
						>
							jedan
						</li>
					))
				}
			</ul>
		</div>
	)
}
