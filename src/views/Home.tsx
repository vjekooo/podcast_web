
import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GET_PODCASTS, GET_USER, FETCH_PODCASTS } from '../query/query'
import { ContentStyle } from './styles/Home'

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
	const { data } = useQuery(GET_USER)
	const [fetchPodcasts, { data: podcasts }] = useLazyQuery(GET_PODCASTS)
	const [nodeFetch, { data: subscriptions, loading }] = useLazyQuery(FETCH_PODCASTS)

	useEffect(() => {
		if (data) fetchPodcasts()
		if (podcasts) {
			const urlObj: UrlObj = {}
			podcasts.podcasts.forEach((item: Podcast) => {
				const indexString = `url${item.id}`
				urlObj[indexString] = item.url
			})
			const string = JSON.stringify(urlObj)
			nodeFetch({
				variables: { url: string }
			})
		}
	}, [data, podcasts])

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
