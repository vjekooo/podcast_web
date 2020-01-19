
import React, { useContext } from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { LOGOUT } from '../query/query'
import { HeaderStyle, NavStyle, ToolStyle, ThemeSwitch } from './styles/Header'
import { getAccessToken } from '../accessToken'
import { PlayerContext } from '../UseContext'

const Header: React.FC<RouteComponentProps> = ({ history }) => {
	const { handleThemeState, user } = useContext(PlayerContext)

	const [logout] = useMutation(LOGOUT)

	const handleLogout = (): void => {
		if (!user) {
			history.push('/login')
			window.location.reload()
			return
		}
		logout({
			variables: {
				token: getAccessToken()
			}
		}).then(() => {
			history.push('/login')
			window.location.reload()
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
			<ToolStyle>
				<ThemeSwitch
					onClick={handleThemeState}
				>
				</ThemeSwitch>
				<button
					onClick={handleLogout}
				>
					{
						user
							? 'logout'
							: 'login'
					}
				</button>
			</ToolStyle>
		</HeaderStyle >
	)
}

export default (withRouter(Header))
