import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import { GET_FAVORITES } from '../query/query'
import { EpisodeView } from '../components/Episode'
import { Favorite } from '../models/models'

import { FavoriteStyle } from './styles/Favorites'

export const Favorites: React.FC = () => {
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

	useEffect(() => {
		fetchFavorites()
	}, [favorites])

	return (
		<FavoriteStyle>
			<ul>
				{
					favorites &&
						favorites.favorites.map((fav: any) => (
							<li
								key={fav.id}
								onClick={(): void => handleClickEvent(fav)}
							>
								{
									fav.title
								}
							</li>
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
