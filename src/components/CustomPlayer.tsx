
import React, { useState, useRef, useEffect } from 'react'
import { Episode } from '../models/models'
import { PlayerStyle, TopStyle, MainStyle, ControlsStyle } from './styles/CustomPlayer'

interface Props {
	episode: Episode | null;
}

export const CustomPlayer: React.FC<Props> = ({ episode }) => {
	const player = useRef<HTMLAudioElement>({})
	const [play, setPlay] = useState(false)

	// const [skipp, setSkipp] = useState()

	useEffect(() => {
		player.current.src = episode?.url
		player.current.play()
	}, [episode?.title])

	const handlePlayPauseClick = (): void => {
		if (play) {
			player.current.pause()
		} else {
			player.current.play()
		}
	}

	const handleSkipping = (value: string): void => {
		const currentTime = player.current.currentTime
		if (value === 'fwd') {
			player.current.currentTime = currentTime + 30
		} else {
			player.current.currentTime = currentTime - 15
		}
	}

	return (
		<PlayerStyle>
			<TopStyle>
				<audio ref={player} />
			</TopStyle>
			<MainStyle>
				<div className="artwork">
					<img />
				</div>
				<ControlsStyle>
					<div>
						<button
							type="button"
							onClick={(): void => handleSkipping('rwd')}
						>
							rwd
						</button>
					</div>
					<div>
						<button
							onClick={(): void => {
								setPlay(!play)
								handlePlayPauseClick()
							}}
							type="button"
						>
							play/pause
						</button>
					</div>
					<div>
						<button
							type="button"
							onClick={(): void => handleSkipping('fwd')}
						>
							fwd
						</button>
					</div>
				</ControlsStyle>
				<div className="cue">
					que
				</div>
			</MainStyle>
		</PlayerStyle>
	)
}
