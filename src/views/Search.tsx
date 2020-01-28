
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

import { Podcast } from '../models/models'
import { TitleStyle, SearchStyle, ListStyle, SearchContainerStyle } from './styles/Search'

interface State {
	data: Podcast[];
	isLoading: boolean;
}

export const Search: React.FC<RouteComponentProps> = (): JSX.Element => {
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
			.catch(error => {
				console.log(error)
				setData({
					data: [],
					isLoading: false
				})
			})
	}, [searchQuery])

	return (
		<SearchContainerStyle>
			<TitleStyle>
				{
					isLoading
						? 'Searching...'
						: 'Search'
				}
			</TitleStyle>
			<SearchStyle>
				<input
					type="text"
					value={searchQuery}
					onChange={(ev): void => setSearchQuery(ev.target.value)}
				/>
			</SearchStyle>
			<ListStyle>
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
			</ListStyle>
		</SearchContainerStyle>
	)
}
