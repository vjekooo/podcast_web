import React, { useState, useEffect, useContext } from 'react'
import { RouteComponentProps } from 'react-router'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import axios from 'axios'

import { PlayerContext } from '../UseContext'

import { EpisodeView } from './Episode'

import { handleDuration } from '../helpers'

import { Episode } from '../models/models'
import { SUBSCRIBE, GET_PODCASTS, UNSUBSCRIBE } from '../query/query'
import { TitleStyle, InfoStyle, ListStyle, ListItemStyle } from './styles/Podcast'

interface EpisodeState {
	episodeList: Episode[];
	isLoading: boolean;
}

interface PodcastState {
	title: string;
	url: string;
	description: string;
	image: string;
}

export const Podcast: React.FC<RouteComponentProps> = (props) => {
	const { feedUrl } = props.location.state

	const { setValues } = useContext(PlayerContext)

	const [{ episodeList, isLoading }, setEpisodeList] = useState<EpisodeState>({
		episodeList: [],
		isLoading: true
	})
	const [currentEpisode, setCurrentEpisode] = useState<Episode>()
	const [currentPodcast, setCurrentPodcast] = useState<PodcastState>({
		title: '',
		url: '',
		description: '',
		image: ''
	})
	const [fetchPodcasts, { data: podcasts }] = useLazyQuery(GET_PODCASTS)
	const [subscribe] = useMutation(SUBSCRIBE)
	const [unsubscribe] = useMutation(UNSUBSCRIBE)
	const [isEpisodeVisible, setEpisodeVisibilityState] = useState(false)
	const [isSubscribed, setIsSubscribed] = useState(false)

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
				const pubDate = singleItem.getElementsByTagName('pubDate')
				const duration = singleItem.getElementsByTagName('itunes:duration')

				const newPod: Episode = {
					title: title[0].childNodes[0].nodeValue,
					description: description[0].childNodes[0].nodeValue,
					url: enclosure[0].getAttribute('url'),
					pubDate: pubDate[0].childNodes[0].nodeValue,
					duration: duration[0].childNodes[0].nodeValue
				}
				list.push(newPod)
			}
		}

		setEpisodeList({ episodeList: list, isLoading: false })
	}

	const handleEpisode = (): void => {
		setEpisodeVisibilityState(
			currentState => !currentState
		)
	}

	const handleClickEvent = (currentEpisode: Episode): void => {
		setCurrentEpisode(currentEpisode)
		handleEpisode()
	}

	const handleSubscription = (url: string): void => {
		if (isSubscribed) {
			unsubscribe({
				variables: { url },
				refetchQueries: [{ query: GET_PODCASTS }]
			}).catch(err => console.log(err))
		} else {
			subscribe({
				variables: { url },
				refetchQueries: [{ query: GET_PODCASTS }]
			}).catch(err => console.log(err))
		}
	}

	const handleIsSubscribed = (): void => {
		if (podcasts) {
			const value = podcasts.podcasts.find((cast: any) => cast.url === currentPodcast.url)
			if (value) {
				setIsSubscribed(true)
			} else {
				setIsSubscribed(false)
			}
		}
	}

	useEffect(() => {
		axios.get(feedUrl)
			.then(response => {
				const parser = new window.DOMParser()
				handleXml(parser.parseFromString(response.data, 'text/xml'))
				// parseXml(parser.parseFromString(response.data, 'text/xml'))
			})
			.catch(error => console.log(error))
		fetchPodcasts()
	}, [feedUrl])

	useEffect(() => {
		handleIsSubscribed()
	}, [podcasts, currentPodcast])

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
							onClick={(): void => handleSubscription(currentPodcast.url)}
						>
							{
								isSubscribed
									? 'unsubscribe'
									: 'subscribe'
							}
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
				isEpisodeVisible && currentEpisode &&
					<EpisodeView
						currentEpisode={currentEpisode}
						onClick={handleEpisode}
					/>
			}
			<ListStyle>
				<ul>
					{
						episodeList.map((item: Episode, index: number): JSX.Element => (
							<ListItemStyle
								key={index}
							>
								<div
									onClick={(): void => handleClickEvent(item)}
								>
									<span>
										{
											item.title
										}
									</span>
									<span>
										{
											handleDuration(item.duration)
										}
									</span>
								</div>
								<div>
									<button
										type="button"
										onClick={(): void =>
											setValues({
												episode: item,
												isPlayerVisible: true
											})
										}
									>
										play
									</button>
								</div>
							</ListItemStyle>
						))
					}
				</ul>
			</ListStyle>
		</div>
	)
}
