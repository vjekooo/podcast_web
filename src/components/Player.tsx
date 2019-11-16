
import React from 'react'
import styled from 'styled-components'
import { Episode } from './Podcast'

const PlayerStyle = styled.div`
    width: 100%;
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
	padding: .5rem;
`

const HeaderStyle = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
`

const ContentStyle = styled.div`
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
		<PlayerStyle>
			<HeaderStyle>
				<button
					type="button"
					onClick={handlePlayer}
				>
				x
				</button>
			</HeaderStyle>
			<ContentStyle>
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
			</ContentStyle>
		</PlayerStyle>
	)
}
