import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import { SET_FAVORITE, GET_FAVORITES } from '../query/query'
import { Episode } from '../models/models'
import { PlayerContext } from '../UseContext'

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
	currentEpisode: Episode | null;
	onClick: () => void;
}

export const EpisodeView: React.FC<Props> = ({ currentEpisode, onClick }) => {
	const [setFavorite] = useMutation(SET_FAVORITE)
	const [fetchFavorites, { data: favorites }] = useLazyQuery(GET_FAVORITES)

	const { setValues } = useContext(PlayerContext)

	useEffect(() => {
		fetchFavorites()
	}, [favorites])

	const handleFavorite = (title: string, description: string, url: string): void => {
		if (!url) return
		setFavorite({
			variables: { title, description, url }
		}).then(res => console.log(res)).catch(err => console.log(err))
	}

	let isThisOneFavorite = false
	if (favorites && currentEpisode) {
		const value = favorites.favorites.find((fav: any) => fav.url === currentEpisode.url)
		if (value) {
			isThisOneFavorite = true
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
							currentEpisode &&
								currentEpisode.title
						}
					</h3>
					<button
						type="button"
						disabled={isThisOneFavorite}
						onClick={(): void => {
							if (currentEpisode) {
								handleFavorite(
									currentEpisode.title,
									currentEpisode.description,
									currentEpisode.url
								)
							}
						}}
					>
						favorite
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
