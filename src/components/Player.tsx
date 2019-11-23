
import React from 'react'
import styled from 'styled-components'
import { Episode } from '../models/models'

const PlayerStyle = styled.div`
	position: fixed;
	left: 0;
	right: 0;
    bottom: 0;
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
	padding: .5rem;
	z-index: 10;
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
	h3 {
		margin-top: 0;
	}
	audio {
		width: 100%;
	}
`

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
