import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import axios from 'axios'

import { Player } from './Player'

export interface Episode {
	title: string;
	description: string;
	url: string;
}

interface EpisodeState {
	data: Episode[];
	isLoading: boolean;
}

export const Podcast: React.FC<RouteComponentProps> = (props) => {
	const { feedUrl } = props.location.state

	const [{ data, isLoading }, setData] = useState<EpisodeState>({
		data: [],
		isLoading: true
	})
	const [isPlayerVisible, setPlayerState] = useState<boolean>(false)
	const [currentEpisode, setcurrentEpisode] = useState<Episode | null>(null)

	const handleXml = (xml: any): void => {
		const items = xml.getElementsByTagName('item')

		const list: Episode[] = []

		for (const item in items) {
			if (items[item].childNodes) {
				const singleItem = items[item]
				const title = singleItem.getElementsByTagName('title')
				const description = singleItem.getElementsByTagName('description')
				const enclosure = singleItem.getElementsByTagName('enclosure')

				const newPod: Episode = {
					title: title[0].childNodes[0].nodeValue,
					description: description[0].childNodes[0].nodeValue,
					url: enclosure[0].getAttribute('url')
				}
				list.push(newPod)
			}
		}

		setData({ data: list, isLoading: false })
	}

	const handlePlayer = (): void => {
		setPlayerState(
			currentState => !currentState
		)
	}

	const handleClickEvent = (currentEpisode: Episode): void => {
		setcurrentEpisode(currentEpisode)
		handlePlayer()
	}

	useEffect(() => {
		axios.get(feedUrl)
			.then(response => {
				const parser = new window.DOMParser()
				handleXml(parser.parseFromString(response.data, 'text/xml'))
			})
			.catch(error => console.log(error))
	}, [feedUrl])

	return (
		<div>
			<div>
				{
					isLoading
						? 'Loading episodes'
						: 'Episodes'
				}
			</div>
			<div>
				<ul>
					{
						data.map((item: Episode, index): JSX.Element => (
							<li
								key={index}
								onClick={(): void => handleClickEvent(item)}
							>
								{
									item.title
								}
							</li>
						))
					}
				</ul>
			</div>
			{
				isPlayerVisible &&
					<Player
						handlePlayer={handlePlayer}
						currentEpisode={currentEpisode}
					/>
			}
		</div>
	)
}
