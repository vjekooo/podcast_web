import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Podcast } from '../../models/models'

interface State {
	data: Podcast[]
	isLoading: boolean
}

export const Search = (): JSX.Element => {
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
		window
			.fetch(`https://itunes.apple.com/search?term=${searchQuery}&entity=podcast`)
			.then((x) => x.json())
			.then((y) => {
				setData({
					data: y.results,
					isLoading: false
				})
			})
			.catch((error) => {
				console.log(error)
				setData({
					data: [],
					isLoading: false
				})
			})
	}, [searchQuery])

	return (
		<SearchContainer>
			<Title>{isLoading ? 'Searching...' : 'Search'}</Title>
			<SearchInput>
				<input type="text" value={searchQuery} onChange={(ev): void => setSearchQuery(ev.target.value)} />
			</SearchInput>
			<List>
				{data.map(
					(item: Podcast): JSX.Element => {
						return (
							<Link
								to={{
									pathname: `/podcast#`,
									hash: item.feedUrl
								}}
								key={item.collectionId}
							>
								<img src={item.artworkUrl100} />
							</Link>
						)
					}
				)}
			</List>
		</SearchContainer>
	)
}

const SearchContainer = styled.div`
	padding: 0 0.5rem;
`

const Title = styled.div`
	padding: 0.5rem 0%;
`

const SearchInput = styled.div`
	margin-bottom: 1rem;
	input {
		width: 100%;
		min-height: 20px;
		text-transform: uppercase;
		padding: 0.5rem;
		font-size: 14px;
		&:focus {
			outline: none;
		}
	}
`

const List = styled.div`
	width: 100%;
	padding-left: 0;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	a {
		width: 18%;
		padding-bottom: 0.2rem;
	}
	img {
		width: 100%;
	}
`
