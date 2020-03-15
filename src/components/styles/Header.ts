
import styled from 'styled-components'

export const HeaderStyle = styled.header`
	display: flex;
	justify-content: space-between;
    padding: .5rem .5rem 0 .5rem;
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

export const ToolStyle = styled.div`
    display: flex;
    button {
		border-radius: 0;
		border-image: none;
	}
`

export const ThemeSwitch = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props): string => props.theme.switcher};
    margin-right: 1rem;
`
