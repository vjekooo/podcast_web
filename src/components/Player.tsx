
import React from 'react'
import styled from 'styled-components'
import { Episode } from './Podcast'

const PlayerWindow = styled.div`
    position: fixed;
    top: 20px;
    margin: 5% auto;
    left: 0;
    right: 0;
    width: 90%;
    min-height: 400px;
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
`

interface Props {
	handlePlayer: (() => void);
	currentEpisode: Episode | null;
}

export const Player: React.FC<Props> = ({ handlePlayer, currentEpisode }) => {
	return (
		<PlayerWindow>
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
		</PlayerWindow>
	)
}
