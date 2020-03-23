import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import { EpisodeView } from '../components/Episode'
import { FavoriteItem } from '../components/FavoriteItem'

import { GET_FAVORITES } from '../query/podcast_query'
import { Favorite } from '../models/models'

import { FavoriteStyle } from './styles/Favorites'

export const Favorites = (): JSX.Element => {
	const [fetchFavorites, { data: favorites }] = useLazyQuery(GET_FAVORITES)
	const [isEpisodeVisible, setEpisodeVisibilityState] = useState(false)
	const [currentFavorite, setCurrentFavorite] = useState<Favorite | null>(null)

	const handleEpisode = (): void => {
		setEpisodeVisibilityState((currentState) => !currentState)
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
			<FavoriteItem list={favorites?.favorites} onClick={handleClickEvent} />
			{isEpisodeVisible && currentFavorite && (
				<EpisodeView currentEpisode={currentFavorite} onClick={handleEpisode} />
			)}
		</FavoriteStyle>
	)
}
