import React, { useEffect, useContext, useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import { SET_FAVORITE, GET_FAVORITES, REMOVE_FAVORITE } from '../query/query'
import { Episode, Favorite } from '../models/models'
import { PlayerContext } from '../UseContext'

import { handleDate, stripHtmlFromString, calculateTime } from '../helpers'
import { EpisodeStyle, TopStyle, ImageStyle, HeaderStyle, TitleStyle, ContentStyle } from './styles/Episode'
import { CloseIcon, PlayIcon, FavoriteIcon } from '../svgs'

interface Props {
	currentEpisode: Episode | Favorite;
	onClick: () => void;
}

export const EpisodeView: React.FC<Props> = ({ currentEpisode, onClick }) => {
	const { setPlayerValues, theme } = useContext(PlayerContext)

	const [setFavorite] = useMutation(SET_FAVORITE)
	const [removeFavorite] = useMutation(REMOVE_FAVORITE)
	const [fetchFavorites, { data: favorites }] = useLazyQuery(GET_FAVORITES)
	const [isFavorite, setIsFavorite] = useState(false)

	const checkIfEpisodeFavorite = (): void => {
		if (favorites) {
			const value = favorites.favorites.find((fav: Favorite) => fav.url === currentEpisode.url)
			if (value) {
				setIsFavorite(true)
			} else {
				setIsFavorite(false)
			}
		}
	}

	useEffect(() => {
		fetchFavorites()
	}, [])

	useEffect(() => {
		checkIfEpisodeFavorite()
	}, [favorites])

	const setEpisodeFavoriteStatus = ({
		id, title, description, url, duration, pubDate, image
	}: Episode): void => {
		if (isFavorite) {
			removeFavorite({
				variables: { id },
				refetchQueries: [{ query: GET_FAVORITES }]
			}).catch(err => console.log(err))
		} else {
			setFavorite({
				variables: { title, description, url, duration, pubDate, image },
				refetchQueries: [{ query: GET_FAVORITES }]
			}).catch(err => console.log(err))
		}
	}

	return (
		<EpisodeStyle>
			<TopStyle>
				<span
					onClick={onClick}
				>
					<CloseIcon
						width='30px'
						fill={theme === 'dark' ? '#000' : '#fff'}
					/>
				</span>
			</TopStyle>
			<ContentStyle>
				<HeaderStyle>
					<ImageStyle>
						<img src={currentEpisode.image} />
					</ImageStyle>
					<TitleStyle>
						<h3>
							{
								currentEpisode.title
							}
						</h3>
						<p>
							{
								calculateTime(currentEpisode.duration)
							}
						</p>
						<p>
							{
								handleDate(currentEpisode.pubDate)
							}
						</p>
						<div>
							<span
								onClick={(): void => {
									if (currentEpisode) {
										setEpisodeFavoriteStatus(currentEpisode)
									}
								}}
							>
								<FavoriteIcon
									width='30px'
									fill={isFavorite ? '#FFC300' : '#fff'}
									fill2={theme === 'dark' ? '#FFC300' : '#FFC300'}
								/>
							</span>
							<span
								onClick={(): void => {
									if (setPlayerValues) {
										setPlayerValues({
											episode: currentEpisode,
											isPlayerVisible: true
										})
									}
								}}
							>
								<PlayIcon
									width='30px'
									fill={theme === 'dark' ? '#000' : '#fff'}
								/>
							</span>
						</div>
					</TitleStyle>
				</HeaderStyle>
				<div>
					{
						stripHtmlFromString(currentEpisode?.description || '')
					}
				</div>
			</ContentStyle>
		</EpisodeStyle>
	)
}
