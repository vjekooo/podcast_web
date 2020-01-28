import React, { useEffect, useState, useContext } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import { GET_FAVORITES } from '../query/query'
import { EpisodeView } from '../components/Episode'
import { Favorite } from '../models/models'

import { FavoriteStyle, ListItem } from './styles/Favorites'
import { PlayIcon } from '../svgs'
import { PlayerContext } from '../UseContext'

export const Favorites: React.FC = () => {
	const { theme, setPlayerValues } = useContext(PlayerContext)

	const [fetchFavorites, { data: favorites }] = useLazyQuery(GET_FAVORITES)
	const [isEpisodeVisible, setEpisodeVisibilityState] = useState(false)
	const [currentFavorite, setCurrentFavorite] = useState<Favorite | null>(null)

	const handleEpisode = (): void => {
		setEpisodeVisibilityState(
			currentState => !currentState
		)
	}

	const handleClickEvent = (currentFavorite: Favorite): void => {
		setCurrentFavorite(currentFavorite)
		handleEpisode()
	}

	const handlePlayIconClick = (episode: Favorite): void => {
		if (setPlayerValues) {
			setPlayerValues({
				episode: episode,
				isPlayerVisible: true
			})
		}
	}

	useEffect(() => {
		fetchFavorites()
	}, [favorites])

	return (
		<FavoriteStyle>
			<ul>
				{
					favorites &&
						favorites.favorites.map((fav: Favorite) => (
							<ListItem
								key={fav.id}
							>
								<div>
									<img src={fav.image} />
								</div>
								<span
									onClick={(): void => handleClickEvent(fav)}
								>
									{
										fav.title
									}
								</span>
								<span
									onClick={(): void => handlePlayIconClick(fav)}
								>
									<PlayIcon
										width='20px'
										fill={theme ? '#000' : '#fff'}
									/>
								</span>
							</ListItem>
						))
				}
			</ul>
			{
				isEpisodeVisible && currentFavorite &&
					<EpisodeView
						currentEpisode={currentFavorite}
						onClick={handleEpisode}
					/>
			}
		</FavoriteStyle>
	)
}
