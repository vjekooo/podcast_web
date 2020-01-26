import styled from 'styled-components'

interface Props {
	size: boolean;
 }

export const PlayerStyle = styled.div<Props>`
	max-width: 600px;
	margin-right: auto;
    margin-left: auto;
	height: ${(props): string => props.size ? '80px' : '100%'};
	transition: height .5s ease;
	position: fixed;
	left: 0;
	right: 0;
    bottom: 0;
    background-color: ${(props): string => props.theme.playerBackground};
    display: flex;
    flex-direction: column;
	justify-content: ${(props): string => props.size ? 'center' : ''};
	padding: .5rem;
	z-index: 10;
`

export const TopStyle = styled.div<Props>`
	display: flex;
	height: ${(props): string => !props.size ? '70%' : '1px'};
`

export const ArtworkStyleSmall = styled.div<Props>`
	display: ${(props): string => props.size ? 'block' : 'none'};
`

export const ArtworkStyleBig = styled.div<Props>`
	display: ${(props): string => !props.size ? 'flex' : 'none'};
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	margin-bottom: 1rem;
	img {
		width: 100%;
		margin-bottom: 2rem;
	}
	div {
		margin-bottom: 2rem;
	}
	input[type=range]::range-track {
		width: 100%;
		height: 20px;
		border-radius: 10px;
		background-color: #eee;
		border: 2px solid #ccc;
	}

	input[type=range]::range-thumb {
		width: 40px;
		height: 40px;
		border-radius: 100%;
		background-color: white;
		border: 2px solid #1976D2;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
	}

	input[type=range]::range-progress {
		height: 20px;
		border-radius: 10px 0 0 10px;
		background-color: #2196F3;
		border: 2px solid #1976D2;
	}
	input {
		width: 90%;
	}
	> span {
		width: 90%;
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		margin: .5rem 0;
	}
`

export const MainStyle = styled.div<Props>`
	display: flex;
	justify-content: ${(props): string => props.size ? 'space-between' : 'center'};
	align-items: center;
	height: ${(props): string => !props.size ? '30%' : 'auto'};
	img {
		width: 50px;
		height: 50px;
	}
`

export const ControlsStyle = styled.div`
	display: flex;
	align-items: center;
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
		border-radius: 0;
	}
`

export const ButtonStyle = styled.div<Props>`
	position: ${(props): string => props.size ? 'static' : 'absolute'};
	right: 10px;
	bottom: 50px;
	button {
		border-radius: 0;
		border-image: none;
	}
`
