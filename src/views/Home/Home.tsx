import React, { useEffect, useContext } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GET_PODCASTS, FETCH_PODCASTS } from '../../query/podcast_query'
import { ContentStyle, LoginStyle } from './style'
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
			<ContentStyle>
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
			</ContentStyle>
			{!user && (
				<LoginStyle>
					<h1>Podcast</h1>
					<div>
						<Link to="/login">login</Link>
						<span>or</span>
						<Link to="/register">register</Link>
					</div>
				</LoginStyle>
			)}
		</div>
	)
}
