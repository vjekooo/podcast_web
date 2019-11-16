
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const InputStyle = styled.input`
	width: 100%;
	min-height: 20px;
	text-transform: uppercase;
	padding: .5rem;
	&:focus {
		outline: none;
	}
`

interface State {
	data: Podcast[];
	isLoading: boolean;
}

interface Podcast {
	feedUrl: string;
	collectionId: string;
	artworkUrl100: string;
}

export const Home: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [{ data, isLoading }, setData] = useState<State>({
		data: [],
		isLoading: false
	})

	useEffect(() => {
		setData({
			data: [],
			isLoading: true
		})
		window.fetch(`https://itunes.apple.com/search?term=${searchQuery}&entity=podcast`)
			.then(x => x.json())
			.then(y => {
				setData({
					data: y.results,
					isLoading: false
				})
			})
	}, [searchQuery])

	return (
		<div>
			<div>
				{
					isLoading
						? 'Searching...'
						: 'Search'
				}
			</div>
			<div>
				<InputStyle
					type="text"
					value={searchQuery}
					onChange={(ev): void => setSearchQuery(ev.target.value)}
				/>
			</div>
			<div>
				<ul>
					{
						data.map((item: Podcast): JSX.Element => (
							<Link
								to={{
									pathname: '/podcast',
									state: {
										feedUrl: item.feedUrl
									}
								}}
								key={item.collectionId}
							>
								<img src={item.artworkUrl100} />
							</Link>
						))
					}
				</ul>
			</div>
		</div>
	)
}
