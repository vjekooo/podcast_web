import React, { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import { SET_FAVORITE, GET_FAVORITES, REMOVE_FAVORITE } from '../query/query'
import { Episode } from '../models/models'
import { PlayerContext } from '../UseContext'

import { handleDuration, handleDate } from '../helpers'

const EpisodeStyle = styled.div`
    position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: aquamarine;
	padding: 1rem;
`

const TopStyle = styled.div`
    display: flex;
`

const HeaderStyle = styled.div`
    margin-bottom: 2rem;
	display: flex;

`
const TitleStyle = styled.div`

`

const ImageStyle = styled.div`
    width: 30%;
`

interface Props {
	currentEpisode: Episode;
	onClick: () => void;
}

export const EpisodeView: React.FC<Props> = ({ currentEpisode, onClick }) => {
	const { setValues } = useContext(PlayerContext)

	const [setFavorite] = useMutation(SET_FAVORITE)
	const [removeFavorite] = useMutation(REMOVE_FAVORITE)
	const [fetchFavorites, { data: favorites }] = useLazyQuery(GET_FAVORITES)
	const [isFavorite, setIsFavorite] = useState(false)

	const handleFavoriteEpisode = (): void => {
		if (favorites) {
			const value = favorites.favorites.find((fav: any) => fav.url === currentEpisode.url)
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
		handleFavoriteEpisode()
	}, [favorites])

	const handleFavorite = ({
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
							handleDuration(currentEpisode.duration)
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
								handleFavorite(currentEpisode)
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
						onClick={(): void =>
							setValues({
								episode: currentEpisode,
								isPlayerVisible: true
							})
						}
					>
						play
					</button>
				</TitleStyle>
			</HeaderStyle>
			<div>
				{
					currentEpisode &&
						currentEpisode.description
				}
			</div>
		</EpisodeStyle>
	)
}
