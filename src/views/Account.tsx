import React, { useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import { LOGOUT, USER_PROFILE } from '../query/user_query'
import { PlayerContext } from '../UseContext'
import { getAccessToken } from '../accessToken'
import { AccountContent, AccountMain, AccountTop } from './styles/Account'

export const Account = (): JSX.Element => {
	const navigate = useNavigate()
	const { user } = useContext(PlayerContext)

	const [logout] = useMutation(LOGOUT)
	const [fetchUserProfile, { data: profile }] = useLazyQuery(USER_PROFILE)

	useEffect(() => {
		fetchUserProfile()
	}, [])

	const handleLogout = (): void => {
		if (!user) {
			navigate('/login')
			window.location.reload()
			return
		}
		logout({
			variables: {
				token: getAccessToken()
			}
		}).then(() => {
			navigate('/login')
			window.location.reload()
		})
	}

	return (
		<AccountContent>
			<AccountTop>
				<h5>{profile?.userProfile.email}</h5>
				<div>
					<span onClick={handleLogout}>{user ? 'logout' : 'login'}</span>
				</div>
			</AccountTop>
			<AccountMain>
				<Link to="/friends">Find friends</Link>
				<Link to="/history">Listeining history</Link>
			</AccountMain>
		</AccountContent>
	)
}
