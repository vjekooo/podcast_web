import styled from 'styled-components'

export const PlayerStyle = styled.div`
	min-height: 80px;
	position: fixed;
	left: 0;
	right: 0;
    bottom: 0;
    background-color: ${(props): string => props.theme.playerBackground};
    display: flex;
    flex-direction: column;
	justify-content: center;
	padding: .5rem;
	z-index: 10;
`

export const TopStyle = styled.div`
	display: flex;
`

export const MainStyle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: auto;
	img {
		width: 50px;
		height: 50px;
	}
`

export const ControlsStyle = styled.div`
	display: flex;
	width: 60%;
	div {
		display: flex;
		width: 33%;
		justify-content: center;
	}
	button {
		margin: 0 .5rem;
		padding: .5rem;
		height: 30px;
		width: 100%;
	}
`
