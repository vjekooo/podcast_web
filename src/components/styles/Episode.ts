
import styled from 'styled-components'

export const EpisodeStyle = styled.div`
    position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
    background-color: ${(props): string => props.theme.playerBackground};
	padding: 1rem;
`

export const TopStyle = styled.div`
    display: flex;
`

export const HeaderStyle = styled.div`
    margin-bottom: 2rem;
	display: flex;
`

export const TitleStyle = styled.div`

`

export const ImageStyle = styled.div`
    width: 30%;
`
