
import React from 'react'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => (
	<header>
		<div>
			<Link to="/">Hello</Link>
			<Link to="/world">World</Link>
		</div>
	</header >
)
