import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

import { FETCH_HISTORY } from '../../query/podcast_query'
// import { Favorite } from '../models/models'
import { FavoriteItem } from '../../components/Favorite/FavoriteItem'
import { Favorite } from '../../models/models'
import { EpisodeView } from '../../components/Episode/Episode'

export const History = (): JSX.Element => {
	const [fetchHistory, { data: history }] = useLazyQuery(FETCH_HISTORY)

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
		fetchHistory()
	}, [])

	return (
		<HistoryContainer>
			<FavoriteItem list={history?.fetchHistory} onClick={handleClickEvent} />
			{isEpisodeVisible && currentFavorite && <EpisodeView currentEpisode={currentFavorite} onClick={handleEpisode} />}
		</HistoryContainer>
	)
}

const HistoryContainer = styled.div`
	display: flex;
	padding: 0 0.5rem;
`
