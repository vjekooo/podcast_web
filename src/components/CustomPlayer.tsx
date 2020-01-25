
import React, { useState, useRef, useEffect } from 'react'
import { Episode } from '../models/models'
import { PlayerStyle, TopStyle, MainStyle, ControlsStyle, ArtworkStyleSmall, ArtworkStyleBig, ButtonStyle } from './styles/CustomPlayer'

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

	const handleProgressChange = (event: any): void => {
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

	// const calculateTotalValue = (length: number): string => {
	// 	const minutes = Math.floor(length / 60)
	// 	const secondsInt = length - minutes * 60
	// 	const secondsStr = secondsInt.toString()
	// 	const seconds = secondsStr.substr(0, 2)
	// 	const time = minutes + ':' + seconds

	// 	return time
	// }

	const calculateCurrentValue = (value: number): string => {
		const num = Number(value)
		const hours = Math.floor(num / 3600)
		const minutes = Math.floor(num % 3600 / 60)
		const seconds = Math.floor(num % 3600 % 60)

		const hoursDisplay = hours > 0 ? `${hours}:` : ''
		const minutesDisplay = minutes > 0 ? minutes : '00'
		const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds

		return `${hoursDisplay}${minutesDisplay}:${secondsDisplay}`
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
									calculateCurrentValue(player.current.currentTime)
							}
						</span>
						<span>
							-
							{
								player.current.duration &&
									calculateCurrentValue(
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
