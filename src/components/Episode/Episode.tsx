import React, { useEffect, useContext, useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

import { SET_FAVORITE, GET_FAVORITES, REMOVE_FAVORITE } from '../../query/podcast_query'
import { Episode, Favorite } from '../../models/models'
import { PlayerContext } from '../../UseContext'

import { handleDate, stripHtmlFromString, calculateTime } from '../../helpers'
import { CloseIcon, PlayIcon, FavoriteIcon } from '../../svgs'

interface Props {
	currentEpisode: Episode | Favorite
	onClick: () => void
}

export const EpisodeView = ({ currentEpisode, onClick }: Props): JSX.Element => {
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

	const setEpisodeFavoriteStatus = ({ id, title, description, url, duration, pubDate, image }: Episode): void => {
		if (isFavorite) {
			removeFavorite({
				variables: { id },
				refetchQueries: [{ query: GET_FAVORITES }]
			}).catch((err) => console.log(err))
		} else {
			setFavorite({
				variables: { title, description, url, duration, pubDate, image },
				refetchQueries: [{ query: GET_FAVORITES }]
			}).catch((err) => console.log(err))
		}
	}

	return (
		<EpisodeContainer>
			<EpisodeHeader>
				<span onClick={onClick}>
					<CloseIcon width="30px" fill={theme === 'light' ? '#000' : '#fff'} />
				</span>
			</EpisodeHeader>
			<EpisodeContent>
				<ContentTop>
					<Image>
						<img src={currentEpisode.image} />
					</Image>
					<Title>
						<h3>{currentEpisode.title}</h3>
						<p>{calculateTime(currentEpisode.duration)}</p>
						<p>{handleDate(currentEpisode.pubDate)}</p>
						<div>
							<span
								onClick={(): void => {
									if (currentEpisode) {
										setEpisodeFavoriteStatus(currentEpisode)
									}
								}}
							>
								<FavoriteIcon
									width="30px"
									fill={isFavorite ? '#FFC300' : '#fff'}
									fill2={theme === 'light' ? '#FFC300' : '#FFC300'}
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
								<PlayIcon width="30px" fill={theme === 'light' ? '#000' : '#fff'} />
							</span>
						</div>
					</Title>
				</ContentTop>
				<div>{stripHtmlFromString(currentEpisode?.description ?? '')}</div>
			</EpisodeContent>
		</EpisodeContainer>
	)
}

const EpisodeContainer = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: ${(props): string => props.theme.playerBackground};
	padding: 1rem;
	z-index: 10;
	overflow: auto;
`

const EpisodeHeader = styled.div`
	display: flex;
`

const ContentTop = styled.div`
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column;
	padding-top: 2rem;
`

const Title = styled.div`
	text-align: center;
	div {
		span {
			margin-right: 1rem;
		}
	}
`
const EpisodeContent = styled.div`
	overflow-y: scroll;
`

const Image = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 40%;
	}
`
