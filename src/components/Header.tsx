
import React from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { LOGOUT } from '../query/query'
import { HeaderStyle, NavStyle } from './styles/Header'
import { getAccessToken } from '../accessToken'

const Header: React.FC<RouteComponentProps> = ({ history }) => {
	const [logout] = useMutation(LOGOUT)

	const handleLogout = (): void => {
		logout({
			variables: {
				token: getAccessToken()
			}
		}).then(() => {
			history.push('/login')
		})
	}

	return (
		<HeaderStyle>
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
					to="/account"
					activeClassName="link-active"
				>
					Account
				</NavLink>
			</NavStyle>
			<div>
				<button
					onClick={handleLogout}
				>
					logout
				</button>
			</div>
		</HeaderStyle >
	)
}

export default (withRouter(Header))
