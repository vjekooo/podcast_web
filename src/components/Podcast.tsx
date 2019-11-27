import React, { useState, useEffect, useContext } from 'react'
import { RouteComponentProps } from 'react-router'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import { PlayerContext } from '../UseContext'

import { EpisodeView } from './Episode'

import { Episode } from '../models/models'
import { SUBSCRIBE, GET_PODCASTS, UNSUBSCRIBE, NODE_FETCH } from '../query/query'
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

	const [currentEpisode, setCurrentEpisode] = useState<Episode>()
	const [fetchPodcasts, { data: podcasts, loading }] = useLazyQuery(GET_PODCASTS)
	const [subscribe] = useMutation(SUBSCRIBE)
	const [unsubscribe] = useMutation(UNSUBSCRIBE)
	const [isEpisodeVisible, setEpisodeVisibilityState] = useState(false)
	const [isSubscribed, setIsSubscribed] = useState(false)

	const [nodeFetch, { data: podcast }] = useLazyQuery(NODE_FETCH)

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
		const currentPodcast = podcast && podcast.fetchPodcasts[0]
		if (currentPodcast) {
			const value = podcasts.podcasts.find((cast: any) => cast.url === currentPodcast.url)
			if (value) {
				setIsSubscribed(true)
			} else {
				setIsSubscribed(false)
			}
		}
	}

	useEffect(() => {
		const url = {
			url: feedUrl
		}
		nodeFetch({
			variables: { url: JSON.stringify(url) }
		})
		fetchPodcasts()
	}, [feedUrl])

	useEffect(() => {
		handleIsSubscribed()
	}, [podcast.fetchPodcasts])

	console.log(podcast)

	return (
		<div>
			<TitleStyle>
				{
					loading &&
						'Loading podcast'
				}
			</TitleStyle>
			<InfoStyle>
				<div className="info-header">
					<img src={
						podcast &&
							podcast.fetchPodcasts[0].image
					} />
					<div>
						<h3>
							{
								podcast &&
									podcast.fetchPodcasts[0].title
							}
						</h3>
						<button
							type="button"
							onClick={(): void => handleSubscription(
								podcast &&
									podcast.fetchPodcasts[0].url
							)}
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
						{
							podcast &&
								podcast.fetchPodcasts[0].description
						}
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
						podcast &&
							podcast.fetchPodcasts[0].episodes.map((item: Episode, index: number): JSX.Element => (
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
												item.duration
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
