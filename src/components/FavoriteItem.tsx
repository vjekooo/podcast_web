
import React, { useContext } from 'react'

import { PlayIcon } from '../svgs'
import { FavItem, FavoriteMain } from './styles/FavoriteItem'
import { Favorite } from '../models/models'
import { PlayerContext } from '../UseContext'

interface Props {
	list: Favorite[];
	onClick: (value: Favorite) => void;
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
			{
				list?.map(fav => {
					return (
						<FavItem
							key={fav.id}
						>
							<div>
								<img src={fav.image} />
							</div>
							<span
								onClick={(): void => onClick(fav)}
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
									fill={theme === 'light' ? '#000' : '#fff'}
								/>
							</span>
						</FavItem>
					)
				})
			}
		</FavoriteMain>
	)
}
