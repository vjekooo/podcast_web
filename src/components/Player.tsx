
import React from 'react'
import styled from 'styled-components'
import { Episode } from './Podcast'

const PlayerWindow = styled.div`
    width: 100%;
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
	padding: .5rem;
`

const PlayerHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
`

const PlayerContent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	audio {
		width: 100%;
	}
`

interface Props {
	handlePlayer: (() => void);
	currentEpisode: Episode | null;
}

export const Player: React.FC<Props> = ({ handlePlayer, currentEpisode }) => {
	return (
		<PlayerWindow>
			<PlayerHeader>
				<button
					type="button"
					onClick={handlePlayer}
				>
				x
				</button>
			</PlayerHeader>
			<PlayerContent>
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
			</PlayerContent>
		</PlayerWindow>
	)
}
