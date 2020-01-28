import styled from 'styled-components'

export const FavoriteStyle = styled.div`
    display: flex;
	ul {
		list-style-type: none;
		padding-left: 0;
	}
	li {
		/* border-bottom: 1px solid gray; */
		padding: .5rem .5rem;
	}
`

export const ListItem = styled.li`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-between;
	div:first-child {
		width: 15%;
		display: flex;
		img {
			width: 100%;
		}
	}
	span {
		width: 75%;
		padding: 0 .5rem;
	}
	span:last-child {
		width: 10%;
	}
`
