
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const TitleStyle = styled.div`
	padding: .5rem 0%;
`

const SearchStyle = styled.div`
	margin-bottom: 1rem;
	input {
		width: 100%;
		min-height: 20px;
		text-transform: uppercase;
		padding: .5rem;
		&:focus {
			outline: none;
		}
	}
`

const ListStyle = styled.div`
	width: 100%;
	padding-left: 0;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	a {
		width: 18%;
		padding-bottom: .2rem;
	}
	img {
		width: 100%;
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
		</div>
	)
}
