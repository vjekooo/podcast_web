import React, { useEffect, useContext, useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import { SET_FAVORITE, GET_FAVORITES, REMOVE_FAVORITE } from '../query/query'
import { Episode, Favorite } from '../models/models'
import { PlayerContext } from '../UseContext'

import { handleDate, stripHtmlFromString, calculateTime } from '../helpers'
import { EpisodeStyle, TopStyle, ImageStyle, HeaderStyle, TitleStyle } from './styles/Episode'

interface Props {
	currentEpisode: Episode | Favorite;
	onClick: () => void;
}

export const EpisodeView: React.FC<Props> = ({ currentEpisode, onClick }) => {
	const { setPlayerValues } = useContext(PlayerContext)

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
		id, title, description, url, duration, pubDate
	}: Episode): void => {
		if (isFavorite) {
			removeFavorite({
				variables: { id },
				refetchQueries: [{ query: GET_FAVORITES }]
			}).catch(err => console.log(err))
		} else {
			setFavorite({
				variables: { title, description, url, duration, pubDate },
				refetchQueries: [{ query: GET_FAVORITES }]
			}).catch(err => console.log(err))
		}
	}

	return (
		<EpisodeStyle>
			<TopStyle>
				<button
					type="button"
					onClick={onClick}
				>
					close
				</button>
			</TopStyle>
			<HeaderStyle>
				<ImageStyle>
					<img />
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
					<button
						type="button"
						onClick={(): void => {
							if (currentEpisode) {
								setEpisodeFavoriteStatus(currentEpisode)
							}
						}}
					>
						{
							isFavorite
								? 'unFavorite'
								: 'favorite'
						}
					</button>
					<button
						type="button"
						onClick={(): void => {
							if (setPlayerValues) {
								setPlayerValues({
									episode: currentEpisode,
									isPlayerVisible: true
								})
							}
						}}
					>
						play
					</button>
				</TitleStyle>
			</HeaderStyle>
			<div>
				{
					stripHtmlFromString(currentEpisode?.description || '')
				}
			</div>
		</EpisodeStyle>
	)
}
