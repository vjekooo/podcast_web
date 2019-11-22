import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import axios from 'axios'

// import { Player } from './Player'
import { gql } from 'apollo-boost'
import { Episode } from './Episode'

const TitleStyle = styled.div`
    padding: .5rem 0;
`

const InfoStyle = styled.div`
    padding: .5rem 0;
	img {
		width: 150px;
		margin-right: 1rem;
	}
	.info-header {
		display: flex;
	}
	h3 {
		margin-top: 0;
	}
`

const ListStyle = styled.div`
    ul {
		list-style-type: none;
		padding-left: 0;
	}
`

export interface Episode {
	title: string;
	description: string;
	url: string;
}

interface EpisodeState {
	podcastList: Episode[];
	isLoading: boolean;
}

interface PodcastState {
	title: string;
	url: string;
	description: string;
	image: string;
}

const SUBSCRIBE = gql`
	mutation Subscribe($url: String!) {
		subscribe(url: $url)
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

export const Podcast: React.FC<RouteComponentProps> = (props) => {
	const { feedUrl } = props.location.state

	const [{ podcastList, isLoading }, setPodcastList] = useState<EpisodeState>({
		podcastList: [],
		isLoading: true
	})
	// const [isPlayerVisible, setPlayerState] = useState<boolean>(false)
	const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null)
	const [currentPodcast, setCurrentPodcast] = useState<PodcastState>({
		title: '',
		url: '',
		description: '',
		image: ''
	})
	const [fetchPodcasts, { data: podcasts }] = useLazyQuery(GET_PODCASTS)
	const [subscribe] = useMutation(SUBSCRIBE)
	const [isEpisodeVisible, setEpisodeVisibilityState] = useState(false)

	const handleXml = (xml: any): void => {
		const items = xml.getElementsByTagName('item')
		const title = xml.getElementsByTagName('title')
		const url = xml.getElementsByTagName('itunes:new-feed-url')
		const description = xml.getElementsByTagName('description')
		const image = xml.getElementsByTagName('itunes:image')

		setCurrentPodcast({
			title: title[0].childNodes[0].nodeValue,
			url: url[0].childNodes[0].nodeValue,
			description: description[0].childNodes[0].nodeValue,
			image: image[0].getAttribute('href')
		})

		const list: Episode[] = []

		for (const item in items) {
			if (items[item].childNodes) {
				const singleItem = items[item]
				const title = singleItem.getElementsByTagName('title')
				const description = singleItem.getElementsByTagName('description')
				const enclosure = singleItem.getElementsByTagName('enclosure')

				const newPod: Episode = {
					title: title[0].childNodes[0].nodeValue,
					description: description[0].childNodes[0].nodeValue,
					url: enclosure[0].getAttribute('url')
				}
				list.push(newPod)
			}
		}

		setPodcastList({ podcastList: list, isLoading: false })
	}

	// const handlePlayer = (): void => {
	// 	setPlayerState(
	// 		currentState => !currentState
	// 	)
	// }

	const handleEpisode = (): void => {
		setEpisodeVisibilityState(
			currentState => !currentState
		)
	}

	const handleClickEvent = (currentEpisode: Episode): void => {
		setCurrentEpisode(currentEpisode)
		handleEpisode()
		// handlePlayer()
	}

	const subscribeToPodacast = (url: string): void => {
		subscribe({
			variables: { url }
		}).then(res => console.log(res)).catch(err => console.log(err))
	}

	useEffect(() => {
		axios.get(feedUrl)
			.then(response => {
				const parser = new window.DOMParser()
				handleXml(parser.parseFromString(response.data, 'text/xml'))
			})
			.catch(error => console.log(error))
		fetchPodcasts()
	}, [feedUrl])

	let areWeSubscribed = false
	if (podcasts) {
		const value = podcasts.podcasts.find((cast: any) => cast.url === currentPodcast.url)
		if (value) {
			areWeSubscribed = true
		}
	}

	return (
		<div>
			<TitleStyle>
				{
					isLoading &&
						'Loading episodes'
				}
			</TitleStyle>
			<InfoStyle>
				<div className="info-header">
					<img src={currentPodcast.image} />
					<div>
						<h3>
							{currentPodcast.title}
						</h3>
						<button
							type="button"
							onClick={(): void => subscribeToPodacast(currentPodcast.url)}
							disabled={areWeSubscribed}
						>
							subscribe
						</button>
					</div>
				</div>
				<div>
					<p>
						{currentPodcast.description}
					</p>
				</div>
			</InfoStyle>
			{
				isEpisodeVisible &&
					// <Player
					// 	handlePlayer={handlePlayer}
					// 	currentEpisode={currentEpisode}
					// />
					<Episode
						currentEpisode={currentEpisode}
						onClick={handleEpisode}
					/>
			}
			<ListStyle>
				<ul>
					{
						podcastList.map((item: Episode, index): JSX.Element => (
							<li
								key={index}
								onClick={(): void => handleClickEvent(item)}
							>
								{
									item.title
								}
							</li>
						))
					}
				</ul>
			</ListStyle>
		</div>
	)
}
