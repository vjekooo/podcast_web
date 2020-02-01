import styled from 'styled-components'

export const PodcastContainer = styled.div`
	padding: 0 .5rem;
`

export const InfoStyle = styled.div`
	padding-top: 1rem;
	img {
		width: 150px;
		height: 150px;
		margin-right: 1rem;
	}
	.info-header {
		display: flex;
	}
	h3 {
		margin-top: 0;
	}
	.kill-button {
		opacity: .5;
		pointer-events: none;
	}
`

export const SearchStyle = styled.div`
	width: 100%;
	input {
		width: 100%;
		height: 30px;
	}
`

export const ListStyle = styled.div`
	ul {
		list-style-type: none;
		padding-left: 0;
	}
`

export const ListItemStyle = styled.li`
	display: flex;
	justify-content: space-between;
	margin-bottom: .5rem;
	div:first-child {
		display: flex;
		flex-direction: column;
		width: 90%;
	}
	div:last-child {
		display: flex;
		align-items: center;
	}
	button {
		border-radius: 0;
		border-image: none;
	}
`

export const ListItemTitleStyle = styled.span`

`

export const ListItemTimeStyle = styled.span`
	font-size: .7rem;
`
