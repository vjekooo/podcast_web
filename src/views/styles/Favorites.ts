import styled from 'styled-components'

export const FavoriteStyle = styled.div`
    display: flex;
	ul {
		list-style-type: none;
		padding-left: 0;
	}
	li {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
		span:first-child {
			width: 90%;
		}
	}
`
