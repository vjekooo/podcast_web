
import React from 'react'
import { Episode } from './Podcast'

interface Props {
	handlePlayer: (() => void);
	currentEpisode: Episode | null;
}

export const Player: React.FC<Props> = ({ handlePlayer, currentEpisode }) => {
	return (
		<div className="player">
			<div className="player__header">
				<button
					type="button"
					onClick={handlePlayer}
				>
				x
				</button>
			</div>
			<div className="player__content">
				<h3>
					{
						currentEpisode &&
							currentEpisode.title
					}
				</h3>
				<audio
					controls
				>
					<source src={currentEpisode ? currentEpisode.url : ''} />
				</audio>
			</div>
		</div>
	)
}
