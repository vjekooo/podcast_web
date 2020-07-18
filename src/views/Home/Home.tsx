import React, { useEffect, useContext } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { GET_PODCASTS, FETCH_PODCASTS } from '../../query/podcast_query'
import { PlayerContext } from '../../UseContext'

interface Podcast {
	id: string
	url: string
	image: string
}

interface Subs {
	image: string
	url: string
}

interface UrlObj {
	[key: string]: string
}

export const Home = (): JSX.Element => {
	const { user } = useContext(PlayerContext)

	const [fetchPodcasts, { data: podcasts }] = useLazyQuery(GET_PODCASTS)
	const [nodeFetch, { data: subscriptions, loading }] = useLazyQuery(FETCH_PODCASTS)

	useEffect(() => {
		if (user) fetchPodcasts()
		if (podcasts) {
			const urls = podcasts.podcasts.map((url: Subs) => url.url)
			nodeFetch({
				variables: { urls: urls }
			})
		}
	}, [user, podcasts])

	return (
		<div>
			<div>{loading && <div>...loading</div>}</div>
			<Content>
				{subscriptions?.fetchPodcasts.map(
					(podcast: Podcast, index: number): JSX.Element => (
						<Link
							to={{
								pathname: '/podcast',
								hash: `#${podcast.url}`
							}}
							key={index}
						>
							<img src={podcast.image} />
						</Link>
					)
				)}
			</Content>
			{!user && (
				<Login>
					<h1>Podcast</h1>
					<div>
						<Link to="/login">login</Link>
						<span>or</span>
						<Link to="/register">register</Link>
					</div>
				</Login>
			)}
		</div>
	)
}

const Content = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 1rem;
	a {
		width: 33.3%;
	}
	img {
		width: 100%;
		height: 100%;
	}
`

const Login = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	a {
		padding: 0.5rem;
		margin: 0 1rem;
		text-decoration: none;
		color: white;
		background-color: blueviolet;
	}
`
