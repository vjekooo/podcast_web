import React, { useState, useRef, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'

import { Episode } from '../../models/models'
import { calculateTime } from '../../helpers'

import { ForwardIcon, RewindIcon, PauseIcon, PlayIcon, Arrow } from '../../svgs'

import { SET_TO_HISTORY, FETCH_HISTORY } from '../../query/podcast_query'

interface Props {
	episode?: Episode | null
	theme: string
}

interface AudioRef {
	current: HTMLAudioElement
}

export const CustomPlayer = ({ episode, theme }: Props): JSX.Element => {
	const player = useRef<any>({})
	const [play, setPlay] = useState(false)
	const [isPlayerSmall, setPlayerSize] = useState(true)
	const [playTime, setPlayTime] = useState(0)
	const [setHistory] = useMutation(SET_TO_HISTORY)

	useEffect(() => {
		try {
			player.current.src = episode?.url
			player.current.play()
			if (episode?.url) {
				const { title, description, url, duration, pubDate, image } = episode
				setHistory({
					variables: {
						title,
						description,
						url,
						duration,
						pubDate,
						image
					},
					refetchQueries: [{ query: FETCH_HISTORY }]
				})
			}
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

		player.current.currentTime = (duration / 100) * value
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
		setPlayTime((currentTime / duration) * 100)
	}

	// let xDown: number | null = null
	// let yDown: number | null = null

	// const getTouches = (evt: any): any => {
	// 	return evt.touches
	// }

	// const handleTouchStart = (evt: any, value?: string): void => {
	// 	if (value) {
	// 		setPlayerSize(!isPlayerSmall)
	// 		return
	// 	}
	// 	const firstTouch = getTouches(evt)[0]
	// 	xDown = firstTouch.clientX
	// 	yDown = firstTouch.clientY
	// }

	// const handleTouchMove = (evt: any): void => {
	// 	if (!xDown || !yDown) {
	// 		return
	// 	}

	// 	const xUp = evt.touches[0].clientX
	// 	const yUp = evt.touches[0].clientY

	// 	const xDiff = xDown - xUp
	// 	const yDiff = yDown - yUp

	// 	if (Math.abs(xDiff) > Math.abs(yDiff)) {
	// 		if (yDiff > 0) {
	// 			setPlayerSize(false)
	// 		} else {
	// 			setPlayerSize(true)
	// 		}
	// 	}
	// 	xDown = null
	// 	yDown = null
	// }

	return (
		<Player size={isPlayerSmall}>
			<Top size={isPlayerSmall}>
				<audio ref={player} onTimeUpdate={handleAudioChange} />
				{!isPlayerSmall && (
					<ArtworkBig size={isPlayerSmall}>
						<BigImage>
							<img src={episode?.image} />
						</BigImage>
						<div>{episode?.title}</div>
						<input type="range" onChange={(e): void => handleProgressChange(e)} value={playTime} />
						<span>
							<span>{player.current.duration && calculateTime(player.current.currentTime)}</span>
							<span>
								-{player.current.duration && calculateTime(player.current.duration - player.current.currentTime)}
							</span>
						</span>
					</ArtworkBig>
				)}
			</Top>
			<Main size={isPlayerSmall}>
				<ArtworkSmall size={isPlayerSmall}>
					<img src={episode?.image} />
				</ArtworkSmall>
				<ControlsStyle>
					<span onClick={(): void => handleSkipping('rwd')}>
						<RewindIcon width={isPlayerSmall ? '30px' : '40px'} fill={theme === 'light' ? '#000' : '#fff'} />
					</span>
					<span onClick={(): void => handlePlayPauseClick()}>
						{!play ? (
							<PauseIcon width={isPlayerSmall ? '40px' : '60px'} fill={theme === 'light' ? '#000' : '#fff'} />
						) : (
							<PlayIcon width={isPlayerSmall ? '40px' : '60px'} fill={theme === 'light' ? '#000' : '#fff'} />
						)}
					</span>
					<span onClick={(): void => handleSkipping('fwd')}>
						<ForwardIcon width={isPlayerSmall ? '30px' : '40px'} fill={theme === 'light' ? '#000' : '#fff'} />
					</span>
				</ControlsStyle>
				<Button size={isPlayerSmall} onClick={(): void => setPlayerSize(!isPlayerSmall)}>
					<Arrow width="30px" fill={theme === 'light' ? '#000' : '#fff'} />
				</Button>
			</Main>
		</Player>
	)
}

interface StyledProps {
	size: boolean
}

const Player = styled.div<StyledProps>`
	max-width: 600px;
	margin-right: auto;
	margin-left: auto;
	height: ${(props): string => (props.size ? '80px' : '100%')};
	transition: height 0.5s ease;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: ${(props): string => props.theme.playerBackground};
	display: flex;
	flex-direction: column;
	justify-content: ${(props): string => (props.size ? 'center' : '')};
	padding: 0.5rem;
	z-index: 10;
`

const Top = styled.div<StyledProps>`
	display: flex;
	height: ${(props): string => (!props.size ? '70%' : '1px')};
	margin-bottom: ${(props): string => (!props.size ? '5%' : '0')};
`

const ArtworkSmall = styled.div<StyledProps>`
	width: 20%;
	img {
		display: ${(props): string => (props.size ? 'block' : 'none')};
	}
`

const ArtworkBig = styled.div<StyledProps>`
	display: ${(props): string => (!props.size ? 'flex' : 'none')};
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	margin-bottom: 1rem;
	div {
		text-align: center;
		font-size: 18px;
	}
	input[type='range']::range-track {
		width: 100%;
		height: 20px;
		border-radius: 10px;
		background-color: #eee;
		border: 2px solid #ccc;
	}

	input[type='range']::range-thumb {
		width: 40px;
		height: 40px;
		border-radius: 100%;
		background-color: white;
		border: 2px solid #1976d2;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
	}

	input[type='range']::range-progress {
		height: 20px;
		border-radius: 10px 0 0 10px;
		background-color: #2196f3;
		border: 2px solid #1976d2;
	}
	input {
		width: 90%;
	}
	> span {
		width: 90%;
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		margin: 0.5rem 0;
	}
`

const BigImage = styled.div`
	width: 100%;
	height: 100%;
	margin-bottom: 1rem;
	img {
		width: 100%;
		max-height: 350px;
		object-fit: contain;
	}
`

const Main = styled.div<StyledProps>`
	display: flex;
	justify-content: ${(props): string => (props.size ? 'space-between' : 'center')};
	align-items: center;
	height: ${(props): string => (!props.size ? '20%' : 'auto')};
	width: 95%;
	margin: 0 auto;
	background-color: ${(props): string => props.theme.playerBackground};
	z-index: 11;
	img {
		width: 50px;
		height: 50px;
	}
`

const ControlsStyle = styled.div`
	display: flex;
	align-items: center;
	width: 60%;
	height: 100%;
	span {
		display: flex;
		width: 33%;
		justify-content: center;
	}
	button {
		margin: 0 0.5rem;
		padding: 0.5rem;
		height: 30px;
		width: 100%;
		border-radius: 0;
	}
`

const Button = styled.div<StyledProps>`
	/* position: ${(props): string => (props.size ? 'static' : 'absolute')}; */
	width: 20%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	svg {
		transform: ${(props): string => (props.size ? 'rotate(0deg)' : 'rotate(180deg)')};
	}
`
