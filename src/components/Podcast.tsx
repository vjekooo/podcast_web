import React, { useState, useEffect, useContext } from 'react'
import { RouteComponentProps } from 'react-router'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import { PlayerContext } from '../UseContext'

import { EpisodeView } from './Episode'

import { Episode } from '../models/models'
import {
	SUBSCRIBE,
	GET_PODCASTS,
	UNSUBSCRIBE,
	FETCH_PODCASTS_EPISODES
} from '../query/query'

import {
	TitleStyle,
	InfoStyle,
	ListStyle,
	ListItemStyle,
	ListItemTitleStyle,
	ListItemTimeStyle
} from './styles/Podcast'

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

	const { setPlayerValues } = useContext(PlayerContext)

	const [currentEpisode, setCurrentEpisode] = useState<Episode>()
	const [fetchPodcasts, { data: podcasts, loading }] = useLazyQuery(GET_PODCASTS)
	const [subscribe] = useMutation(SUBSCRIBE)
	const [unsubscribe] = useMutation(UNSUBSCRIBE)
	const [isEpisodeVisible, setEpisodeVisibilityState] = useState(false)
	const [isSubscribed, setIsSubscribed] = useState(false)

	const [nodeFetch, { data: podcast }] = useLazyQuery(FETCH_PODCASTS_EPISODES)

	const handleEpisode = (): void => {
		setEpisodeVisibilityState(
			currentState => !currentState
		)
	}

	const handleClickOnPodcast = (currentEpisode: Episode): void => {
		setCurrentEpisode(currentEpisode)
		handleEpisode()
	}

	const setPodcastSubscriptionStatus = (url: string): void => {
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

	const checkIfPodcastSubscribed = (): void => {
		const currentPodcast = podcast?.fetchPodcastEpisodes
		if (currentPodcast) {
			const value = podcasts.podcasts
				.find((cast: PodcastState) => cast.url === currentPodcast.url)
			if (value) {
				setIsSubscribed(true)
			} else {
				setIsSubscribed(false)
			}
		}
	}

	useEffect(() => {
		nodeFetch({
			variables: { url: feedUrl }
		})
		fetchPodcasts()
	}, [feedUrl])

	useEffect(() => {
		checkIfPodcastSubscribed()
	}, [podcast?.fetchPodcastEpisodes])

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
						podcast?.fetchPodcastEpisodes.image
					} />
					<div>
						<h3>
							{
								podcast?.fetchPodcastEpisodes.title
							}
						</h3>
						<button
							type="button"
							onClick={(): void => setPodcastSubscriptionStatus(
								podcast?.fetchPodcastEpisodes.url
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
							podcast?.fetchPodcastEpisodes.description
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
						podcast?.fetchPodcastEpisodes.episodes
							.map((item: Episode, index: number): JSX.Element => (
								<ListItemStyle
									key={index}
								>
									<div
										onClick={(): void => handleClickOnPodcast(item)}
									>
										<ListItemTitleStyle>
											{
												item.title
											}
										</ListItemTitleStyle>
										<ListItemTimeStyle>
											{
												item.duration
											}
										</ListItemTimeStyle>
									</div>
									<div>
										<button
											type="button"
											onClick={(): void =>
												setPlayerValues({
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
