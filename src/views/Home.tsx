
import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GET_PODCASTS, GET_USER } from '../query/query'
import { ContentStyle } from './styles/Home'

interface Podcast {
	url: string;
}

interface Subs {
	image: string;
	url: string;
}

export const Home: React.FC = () => {
	const { data } = useQuery(GET_USER)
	const [fetchPodcasts, { data: podcasts, loading }] = useLazyQuery(GET_PODCASTS)
	const [subscriptions, setSubscriptions] = useState<Subs[]>([])

	const handleXml = (xml: any): void => {
		const imageNode = xml.getElementsByTagName('image')
		const image = imageNode[0]
		const imageUrl = image.getElementsByTagName('url')[0].childNodes[0].nodeValue

		const url = xml.getElementsByTagName('itunes:new-feed-url')

		const sub = {
			image: imageUrl,
			url: url[0].childNodes[0].nodeValue
		}
		setSubscriptions([...subscriptions, sub])
	}

	useEffect(() => {
		if (data) fetchPodcasts()
		if (podcasts) {
			podcasts.podcasts.forEach((podcast: Podcast): void => {
				window.fetch(podcast.url)
					.then(res => res.text())
					.then(data => {
						const parser = new window.DOMParser()
						handleXml(parser.parseFromString(data, 'text/xml'))
					})
					.catch(error => console.log(error))
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
					subscriptions &&
						subscriptions.map((podcast: any, index: number) => (
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
