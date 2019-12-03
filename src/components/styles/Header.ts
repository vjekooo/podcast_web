import styled from 'styled-components'

export const HeaderStyle = styled.header`
	display: flex;
	justify-content: space-between;
    padding: .5rem 0 0 0;
`

export const NavStyle = styled.nav`
    display: flex;
    a {
        margin-right: .5rem;
    }
    .link-active {
        color: red;
    }
`
