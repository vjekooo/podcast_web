
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { HeaderStyle, NavStyle, ToolStyle, ThemeSwitch } from './styles/Header'

import { PlayerContext } from '../UseContext'

const Header = (): JSX.Element => {
	const { changeTheme } = useContext(PlayerContext)

	const handleTheme = (): void => {
		if (changeTheme) {
			changeTheme()
		}
	}

	return (
		<HeaderStyle>
			<NavStyle>
				<NavLink
					to="/"
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
					onClick={handleTheme}
				>
				</ThemeSwitch>
			</ToolStyle>
		</HeaderStyle >
	)
}

export default Header
