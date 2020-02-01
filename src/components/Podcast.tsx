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
	InfoStyle,
	ListStyle,
	ListItemStyle,
	ListItemTitleStyle,
	ListItemTimeStyle,
	PodcastContainer
	// SearchStyle
} from './styles/Podcast'

import { stripHtmlFromString, calculateTime } from '../helpers'
import { PlayIcon, Star } from '../svgs'
import { Modal } from './Modal'
import { Loading } from './Loading'

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

	const { setPlayerValues, theme } = useContext(PlayerContext)

	const [currentEpisode, setCurrentEpisode] = useState<Episode>()
	const [fetchPodcasts, { data: podcasts }] = useLazyQuery(GET_PODCASTS)
	const [subscribe, { loading: subscribeLoading, error: subscribeError }] = useMutation(SUBSCRIBE)
	const [unsubscribe, { loading: unsubscribeLoading, error: unsubscribeError }] = useMutation(UNSUBSCRIBE)
	const [isEpisodeVisible, setEpisodeVisibilityState] = useState(false)
	const [isSubscribed, setIsSubscribed] = useState(false)

	const [nodeFetch, { data: podcast, loading }] = useLazyQuery(FETCH_PODCASTS_EPISODES)

	const [isModalActive, setModalStatus] = useState(false)

	// const [searchValue, setSearchValue] = useState('')

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

	// const handleSearchInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
	// 	console.log(event?.currentTarget.value)
	// 	setSearchValue(event.currentTarget.value)
	// }

	useEffect(() => {
		nodeFetch({
			variables: { url: feedUrl }
		})
		fetchPodcasts()
	}, [feedUrl])

	useEffect(() => {
		checkIfPodcastSubscribed()
	}, [podcasts?.podcasts])

	useEffect(() => {
		checkIfPodcastSubscribed()
	}, [podcast?.fetchPodcastEpisodes])

	useEffect(() => {
		if (subscribeError || unsubscribeError) {
			setModalStatus(true)
		}
	}, [subscribeError, unsubscribeError])

	return (
		<PodcastContainer>
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
						<span
							onClick={(): void => setPodcastSubscriptionStatus(
								podcast?.fetchPodcastEpisodes.url
							)}
							className={
								subscribeLoading || unsubscribeLoading
									? 'kill-button'
									: ''
							}
						>
							{
								<Star
									width='50px'
									fill={isSubscribed ? '#FFC300' : '#ECF0F1'}
									fill2={isSubscribed ? '#FFC300' : '#fff'}
								/>
							}
						</span>
						{
							(subscribeError || unsubscribeError) &&
								<div>error</div>
						}
					</div>
				</div>
				<div>
					<p>
						{
							stripHtmlFromString(
								podcast?.fetchPodcastEpisodes.description
							)
						}
					</p>
				</div>
			</InfoStyle>
			{/* <SearchStyle>
				<input
					type="text"
					onChange={handleSearchInputChange}
					placeholder="search episodes"
					value={searchValue}
				/>
			</SearchStyle> */}
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
							.map((item: Episode, index: number): JSX.Element => {
								const episodeWithImage = item
								episodeWithImage.image = podcast?.fetchPodcastEpisodes.image
								return (
									<ListItemStyle
										key={index}
									>
										<div
											onClick={(): void => handleClickOnPodcast(episodeWithImage)}
										>
											<ListItemTitleStyle>
												{
													item.title
												}
											</ListItemTitleStyle>
											<ListItemTimeStyle>
												{
													calculateTime(item.duration)
												}
											</ListItemTimeStyle>
										</div>
										<div>
											<span
												onClick={(): void => {
													if (setPlayerValues) {
														setPlayerValues({
															episode: episodeWithImage,
															isPlayerVisible: true
														})
													}
												}}
											>
												<PlayIcon
													width='20px'
													fill={theme === 'dark' ? '#000' : '#fff'}
												/>
											</span>
										</div>
									</ListItemStyle>
								)
							})
					}
				</ul>
			</ListStyle>
			{
				loading &&
					<Loading />
			}
			{
				isModalActive &&
					<Modal
						setModalStatus={setModalStatus}
						value={subscribeError || unsubscribeError}
					/>
			}
		</PodcastContainer>
	)
}
