
import React, { useState, useRef, useEffect } from 'react'
import { Episode } from '../models/models'
import { PlayerStyle, TopStyle, MainStyle, ControlsStyle } from './styles/CustomPlayer'

interface Props {
	episode: Episode | null;
}

interface AudioRef {
	current: HTMLAudioElement;
}

export const CustomPlayer: React.FC<Props> = ({ episode }) => {
	const player = useRef<AudioRef>({})
	const [play, setPlay] = useState(false)
	const [isPlayerSmall, setPlayerSize] = useState(true)

	useEffect(() => {
		player.current.src = episode?.url
		player.current.play()
	}, [episode?.title])

	const handlePlayPauseClick = (): void => {
		const paused = player.current.paused
		if (paused) {
			player.current.play()
			setPlay(false)
		} else {
			player.current.pause()
			setPlay(true)
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

	console.log(isPlayerSmall)

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
							- 15
						</button>
					</div>
					<div>
						<button
							onClick={(): void => handlePlayPauseClick()}
							type="button"
						>
							{
								!play
									? 'pause'
									: 'play'
							}
						</button>
					</div>
					<div>
						<button
							type="button"
							onClick={(): void => handleSkipping('fwd')}
						>
							+ 30
						</button>
					</div>
				</ControlsStyle>
				<div className="cue">
					<button
						onClick={(): void => setPlayerSize(!isPlayerSmall)}
					>
						up
					</button>
				</div>
			</MainStyle>
		</PlayerStyle>
	)
}
