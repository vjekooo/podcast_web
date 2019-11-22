import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Link } from 'react-router-dom'

const FavoriteStyle = styled.div`
    display: flex;
`

const GET_FAVORITES = gql`
	query Favorites {
		favorites {
			id
			title
            url
        }
	}
`

interface Favorite {
	title: string;
	url: string;
}

export const Favorites: React.FC = () => {
	const [fetchFavorites, { data: favorites }] = useLazyQuery(GET_FAVORITES)

	useEffect(() => {
		fetchFavorites()
	}, [favorites])

	return (
		<FavoriteStyle>
			{
				favorites &&
					favorites.favorites.map((fav: any) => (
						<Link
							to="/"
							key={fav.id}
						>
							{
								fav.title
							}
						</Link>
					))
			}
		</FavoriteStyle>
	)
}
