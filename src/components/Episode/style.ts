import styled from 'styled-components'

export const EpisodeStyle = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: ${(props): string => props.theme.playerBackground};
	padding: 1rem;
	z-index: 10;
`

export const TopStyle = styled.div`
	display: flex;
`

export const HeaderStyle = styled.div`
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column;
	padding-top: 2rem;
`

export const TitleStyle = styled.div`
	text-align: center;
	div {
		span {
			margin-right: 1rem;
		}
	}
`
export const ContentStyle = styled.div`
	overflow-y: scroll;
`

export const ImageStyle = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 40%;
	}
`
