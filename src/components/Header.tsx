
import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const NavStyle = styled.nav`
	display: flex;
	padding: .5rem 0 0 0;
	a {
		margin-right: .5rem;
	}
	.link-active {
		color: red;
	}
`

export const Header: React.FC = () => (
	<header>
		<NavStyle>
			<NavLink
				to="/"
				exact
				activeClassName="link-active"
			>
				Home
			</NavLink>
			<NavLink
				to="/search"
				activeClassName="link-active"
			>
				Search
			</NavLink>
			<NavLink
				to="/favorites"
				activeClassName="link-active"
			>
				Favorites
			</NavLink>
			<NavLink
				to="/favorites"
				activeClassName="link-active"
			>
				Account
			</NavLink>
		</NavStyle>
	</header >
)
