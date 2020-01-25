
import React, { useState, useRef, useEffect } from 'react'
import { Episode } from '../models/models'
import { PlayerStyle, TopStyle, MainStyle, ControlsStyle, ArtworkStyleSmall, ArtworkStyleBig, ButtonStyle } from './styles/CustomPlayer'
import { calculateTime } from '../helpers'

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
	const [playTime, setPlayTime] = useState(0)

	useEffect(() => {
		try {
			player.current.src = episode?.url
			player.current.play()
		} catch (error) {
			console.log(error)
		}
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

	const handleProgressChange = (event: React.FormEvent<HTMLInputElement>): void => {
		const duration = player.current.duration
		const value = Number(event.currentTarget.value)

		player.current.currentTime = duration / 100 * value
	}

	const handleSkipping = (value: string): void => {
		const currentTime = player.current.currentTime
		if (value === 'fwd') {
			player.current.currentTime = currentTime + 30
		} else {
			player.current.currentTime = currentTime - 15
		}
	}

	const handleAudioChange = (event: any): void => {
		const currentTime = event.currentTarget.currentTime
		const duration = player.current.duration
		setPlayTime(currentTime / duration * 100)
	}

	return (
		<PlayerStyle size={isPlayerSmall} >
			<TopStyle size={isPlayerSmall}>
				<audio
					ref={player}
					onTimeUpdate={handleAudioChange}
				/>
				<ArtworkStyleBig size={isPlayerSmall} >
					<img />
					<div>
						{
							episode?.title
						}
					</div>
					<input
						type="range"
						onChange={(e): void => handleProgressChange(e)}
						value={playTime}
					/>
					<span>
						<span>
							{
								player.current.duration &&
									calculateTime(player.current.currentTime)
							}
						</span>
						<span>
							-
							{
								player.current.duration &&
									calculateTime(
										player.current.duration - player.current.currentTime
									)
							}
						</span>
					</span>
				</ArtworkStyleBig>
			</TopStyle>
			<MainStyle size={isPlayerSmall} >
				<ArtworkStyleSmall size={isPlayerSmall} >
					<img />
				</ArtworkStyleSmall>
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
				<ButtonStyle size={isPlayerSmall} >
					<button
						onClick={(): void => setPlayerSize(!isPlayerSmall)}
					>
						{
							isPlayerSmall
								? 'up'
								: 'down'
						}
					</button>
				</ButtonStyle>
			</MainStyle>
		</PlayerStyle>
	)
}
