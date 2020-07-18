import React from 'react'
import styled from 'styled-components'

export const Loading = (): JSX.Element => {
	return <LoadingContainer>...loading podcasts</LoadingContainer>
}

const LoadingContainer = styled.div`
	position: fixed;
	top: 0%;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: ${(props): string => props.theme.playerBackground};
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0.9;
	backdrop-filter: blur(5px);
`
