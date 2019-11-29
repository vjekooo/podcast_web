
import React, { useState, useEffect } from 'react'
import { Episode } from '../models/models'
import { PlayerStyle, HeaderStyle, ContentStyle } from './styles/Player'

interface Props {
	setValues: any;
	currentEpisode: Episode | null;
}

export const Player: React.FC<Props> = ({ setValues, currentEpisode }) => {
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
					onClick={(): void =>
						setValues({
							episode: null,
							isPlayerVisible: false
						})
					}
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
