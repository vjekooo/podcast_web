
import React, { useState, useEffect, useContext } from 'react'
import { Episode } from '../models/models'
import { PlayerStyle, HeaderStyle, ContentStyle } from './styles/Player'
import { PlayerContext } from '../UseContext'

interface Values {
	episode: Episode | null;
	isPlayerVisible: boolean;
}

interface Props {
	currentEpisode: Episode | null;
}

export const Player: React.FC<Props> = ({ currentEpisode }) => {
	const { setPlayerValues } = useContext(PlayerContext)

	const [episode, setEpisode] = useState<Episode | null>(null)

	useEffect(() => {
		setEpisode(null)
	}, [currentEpisode?.title])

	useEffect(() => {
		setEpisode(currentEpisode)
	}, [episode])

	return (
		<PlayerStyle>
			<HeaderStyle>
				<button
					type="button"
					onClick={(): void => {
						if (setPlayerValues) {
							setPlayerValues({
								episode: null,
								isPlayerVisible: false
							})
						}
					}}
				>
				x
				</button>
			</HeaderStyle>
			<ContentStyle>
				<h3>
					{
						episode?.title
					}
				</h3>
				{
					episode &&
						<audio
							controls
						>
							<source src={episode?.url ?? ''} />
						</audio>
				}
			</ContentStyle>
		</PlayerStyle>
	)
}
