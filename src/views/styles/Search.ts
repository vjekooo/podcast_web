import styled from 'styled-components'

export const SearchContainerStyle = styled.div`
	padding: 0 .5rem;
`

export const TitleStyle = styled.div`
	padding: .5rem 0%;
`

export const SearchStyle = styled.div`
	margin-bottom: 1rem;
	input {
		width: 100%;
		min-height: 20px;
		text-transform: uppercase;
		padding: .5rem;
		font-size: 14px;
		&:focus {
			outline: none;
		}
	}
`

export const ListStyle = styled.div`
	width: 100%;
	padding-left: 0;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	a {
		width: 18%;
		padding-bottom: .2rem;
	}
	img {
		width: 100%;
	}
`
