
import React, { useEffect, useContext } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GET_PODCASTS, GET_USER, FETCH_PODCASTS } from '../query/query'
import { ContentStyle } from './styles/Home'
import { PlayerContext } from '../UseContext'

interface Podcast {
	id: string;
	url: string;
	image: string;
}

interface Subs {
	image: string;
	url: string;
}

interface UrlObj {
	[key: string]: string;
}

export const Home: React.FC = () => {
	const { user } = useContext(PlayerContext)

	const { data } = useQuery(GET_USER)
	const [fetchPodcasts, { data: podcasts }] = useLazyQuery(GET_PODCASTS)
	const [nodeFetch, { data: subscriptions, loading }] = useLazyQuery(FETCH_PODCASTS)

	useEffect(() => {
		if (data) fetchPodcasts()
		if (podcasts) {
			const urls = podcasts.podcasts.map((url: Subs) => url.url)
			nodeFetch({
				variables: { urls: urls }
			})
		}
	}, [user, podcasts])

	return (
		<div>
			<div>
				{
					loading	&&
						<div>...loading</div>
				}
			</div>
			<ContentStyle>
				{
					subscriptions?.fetchPodcasts
						.map((podcast: Podcast, index: number): JSX.Element => (
							<Link
								to={{
									pathname: '/podcast',
									state: {
										feedUrl: podcast.url
									}
								}}
								key={index}
							>
								<img src={podcast.image} />
							</Link>
						))
				}
			</ContentStyle>
		</div>
	)
}
