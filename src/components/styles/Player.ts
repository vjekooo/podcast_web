import styled from 'styled-components'

export const PlayerStyle = styled.div`
	position: fixed;
	left: 0;
	right: 0;
    bottom: 0;
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
	padding: .5rem;
	z-index: 10;
`

export const HeaderStyle = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
`

export const ContentStyle = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	h3 {
		margin-top: 0;
	}
	audio {
		width: 100%;
	}
`
