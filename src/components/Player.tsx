
import React from 'react'
import { Episode } from '../models/models'
import { PlayerStyle, HeaderStyle, ContentStyle } from './styles/Player'

interface Props {
	setValues: any;
	currentEpisode: Episode | null;
}

export const Player: React.FC<Props> = ({ setValues, currentEpisode }) => {
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
						currentEpisode?.title
					}
				</h3>
				<audio
					controls
				>
					<source src={currentEpisode?.url ?? ''} />
				</audio>
			</ContentStyle>
		</PlayerStyle>
	)
}
