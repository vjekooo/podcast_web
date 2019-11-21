
import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ContentStyle = styled.div`
    display: flex;
	flex-wrap: wrap;
	margin-top: 1rem;
	a {
		width: 30%;
	}
	img {
		width: 100%;
	}
`

const GET_USER = gql`
	query User {
		user
	}
`

const GET_PODCASTS = gql`
	query Podcasts {
		podcasts {
			id,
			url
		}
	}
`

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

	console.log(podcasts)

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
						subscriptions.map((podcast: any) => (
							<Link
								to={{
									pathname: '/podcast',
									state: {
										feedUrl: podcast.url
									}
								}}
								key={podcast.id}
							>
								<img src={podcast.image} />
							</Link>
						))
				}
			</ContentStyle>
		</div>
	)
}
