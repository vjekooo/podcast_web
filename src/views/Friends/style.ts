import styled from 'styled-components'

export const FriendsContainer = styled.div`
	padding: 2rem 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	input {
		width: 100%;
		height: 30px;
		padding: 0.5rem;
	}
	> div {
		width: 100%;
		margin-bottom: 2rem;
	}
`

export const SearchPosition = styled.div`
	position: relative;
`

export const SearchDropdown = styled.div`
	display: flex;
	position: absolute;
	top: 10px;
	width: 100%;
	min-height: 400px;
	background-color: white;
	z-index: 1;
	opacity: 0.9;
	ul {
		width: 100%;
	}
	li {
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
`
