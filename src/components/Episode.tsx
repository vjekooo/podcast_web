import React from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const EpisodeStyle = styled.div`
    position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: aquamarine;
	padding: 1rem;
`

const TopStyle = styled.div`
    display: flex;
`

const HeaderStyle = styled.div`
    margin-bottom: 2rem;
	display: flex;

`
const TitleStyle = styled.div`

`

const ImageStyle = styled.div`
    width: 30%;
`

export interface Episode {
	title: string;
	description: string;
	url: string;
}

interface Props {
	currentEpisode: Episode | null;
	onClick: () => void;
}

const SET_FAVORITE = gql`
	mutation Favorite($title: String!, $url: String!) {
		setFavorite(title: $title, url: $url)
	}
`

export const Episode: React.FC<Props> = ({ currentEpisode, onClick }) => {
	const [setFavorite] = useMutation(SET_FAVORITE)

	const handleFavorite = (title: string, url: string): void => {
		if (!url) return
		setFavorite({
			variables: { title, url }
		}).then(res => console.log(res)).catch(err => console.log(err))
	}

	return (
		<EpisodeStyle>
			<TopStyle>
				<button
					type="button"
					onClick={onClick}
				>
					close
				</button>
			</TopStyle>
			<HeaderStyle>
				<ImageStyle>
					<img />
				</ImageStyle>
				<TitleStyle>
					<h3>
						{
							currentEpisode &&
								currentEpisode.title
						}
					</h3>
					<button
						type="button"
						onClick={(): void => {
							if (currentEpisode) {
								handleFavorite(
									currentEpisode.title,
									currentEpisode.url
								)
							}
						}}
					>
						favorite
					</button>
				</TitleStyle>
			</HeaderStyle>
			<div>
				{
					currentEpisode &&
						currentEpisode.description
				}
			</div>
		</EpisodeStyle>
	)
}
