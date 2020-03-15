
import styled from 'styled-components'

export const FavoriteMain = styled.ul`
    list-style-type: none;
	padding-left: 0;
`

export const FavItem = styled.li`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem .5rem;
    div:first-child {
        width: 15%;
        display: flex;
        img {
            width: 100%;
            height: 100%;
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
