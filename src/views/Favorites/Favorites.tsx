import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

import { EpisodeView } from '../../components/Episode/Episode'
import { FavoriteItem } from '../../components/Favorite/FavoriteItem'
import { GET_FAVORITES } from '../../query/podcast_query'
import { Favorite } from '../../models/models'

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
		<FavoriteContainer>
			<FavoriteItem list={favorites?.favorites} onClick={handleClickEvent} />
			{isEpisodeVisible && currentFavorite && <EpisodeView currentEpisode={currentFavorite} onClick={handleEpisode} />}
		</FavoriteContainer>
	)
}

const FavoriteContainer = styled.div`
	display: flex;
`
