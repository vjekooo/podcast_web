import React, { useContext } from 'react'
import styled from 'styled-components'

import { PlayIcon } from '../../svgs'
import { Favorite } from '../../models/models'
import { PlayerContext } from '../../UseContext'

interface Props {
	list: Favorite[]
	onClick: (value: Favorite) => void
}

export const FavoriteItem = ({ list, onClick }: Props): JSX.Element => {
	const { theme, setPlayerValues } = useContext(PlayerContext)

	const handlePlayIconClick = (episode: Favorite): void => {
		if (setPlayerValues) {
			setPlayerValues({
				episode: episode,
				isPlayerVisible: true
			})
		}
	}

	return (
		<FavoriteMain>
			{list?.map((fav) => {
				return (
					<FavItem key={fav.id}>
						<div>
							<img src={fav.image} />
						</div>
						<span onClick={(): void => onClick(fav)}>{fav.title}</span>
						<span onClick={(): void => handlePlayIconClick(fav)}>
							<PlayIcon width="20px" fill={theme === 'light' ? '#000' : '#fff'} />
						</span>
					</FavItem>
				)
			})}
		</FavoriteMain>
	)
}

const FavoriteMain = styled.ul`
	list-style-type: none;
	padding-left: 0;
`

const FavItem = styled.li`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 0.5rem;
	div:first-child {
		width: 15%;
		display: flex;
		img {
			width: 100%;
			height: 100%;
		}
	}
	span {
		width: 75%;
		padding: 0 0.5rem;
	}
	span:last-child {
		width: 10%;
	}
`
