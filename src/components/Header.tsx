
import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav = styled.nav`
	display: flex;
	padding: .5rem 0 0 0;
	a {
		margin-right: .5rem;
	}
`

export const Header: React.FC = () => (
	<header>
		<Nav>
			<NavLink
				to="/"
				activeClassName="link-active"
			>
				Home
			</NavLink>
			<NavLink
				to="/favorites"
				activeClassName="link-active"
			>
				Favorites
			</NavLink>
			<NavLink
				to="/account"
				activeClassName="link-active"
			>
				Account
			</NavLink>
		</Nav>
	</header >
)
