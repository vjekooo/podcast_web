
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Nav = styled.nav`
	display: flex;
	a {
		margin-right: .5rem;
	}
`

export const Header: React.FC = () => (
	<header>
		<Nav>
			<Link to="/">Home</Link>
			<Link to="/favorites">Favorites</Link>
			<Link to="/account">Account</Link>
		</Nav>
	</header >
)
