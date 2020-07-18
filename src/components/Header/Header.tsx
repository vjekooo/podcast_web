import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { PlayerContext } from '../../UseContext'

const Header = (): JSX.Element => {
	const { changeTheme } = useContext(PlayerContext)

	const handleTheme = (): void => {
		if (changeTheme) {
			changeTheme()
		}
	}

	return (
		<HeaderContainer>
			<Nav>
				<NavLink to="/" activeClassName="link-active">
					Home
				</NavLink>
				<NavLink to="/search" activeClassName="link-active">
					Search
				</NavLink>
				<NavLink to="/favorites" activeClassName="link-active">
					Favorites
				</NavLink>
				<NavLink to="/account" activeClassName="link-active">
					Account
				</NavLink>
			</Nav>
			<Tool>
				<ThemeSwitch onClick={handleTheme}></ThemeSwitch>
			</Tool>
		</HeaderContainer>
	)
}

const HeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 0.5rem 0 0.5rem;
`

const Nav = styled.nav`
	display: flex;
	a {
		margin-right: 0.5rem;
		color: ${(props): string => props.theme.linkColor};
	}
	.link-active {
		color: ${(props): string => props.theme.linkColorActive};
	}
`

const Tool = styled.div`
	display: flex;
	button {
		border-radius: 0;
		border-image: none;
	}
`

const ThemeSwitch = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props): string => props.theme.switcher};
	margin-right: 1rem;
`

export default Header
