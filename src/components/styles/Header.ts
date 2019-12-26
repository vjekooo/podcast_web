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
        color: ${(props): string => props.theme.linkColor}
    }
    .link-active {
        color: ${(props): string => props.theme.linkColorActive};
    }
`
