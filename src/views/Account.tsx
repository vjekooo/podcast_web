
import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import { LOGOUT } from '../query/query'
import { PlayerContext } from '../UseContext'
import { getAccessToken } from '../accessToken'
import { AccountContent } from './styles/Account'

export const Account: React.FC<RouteComponentProps> = ({ history }) => {
	const { user } = useContext(PlayerContext)

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
		<AccountContent>
			<div>
				Hello user
			</div>
			<span
				onClick={handleLogout}
			>
				{
					user
						? 'logout'
						: 'login'
				}
			</span>
		</AccountContent>
	)
}
