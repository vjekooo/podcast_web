
import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { RouteComponentProps } from 'react-router'
import { setAccessToken } from '../accessToken'

import { LOGIN } from '../query/query'
import { FormStyle } from './styles/Login'

import { PlayerContext } from '../UseContext'

export const Login: React.FC<RouteComponentProps> = ({ history }): JSX.Element => {
	const { handleUser } = useContext(PlayerContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [login] = useMutation(LOGIN)

	return (
		<div>
			<div>
				<FormStyle
					onSubmit={(e): void => {
						e.preventDefault()
						login({
							variables: { email, password }
						}).then(res => {
							if (res && res.data) {
								setAccessToken(res.data.login.accessToken)
								handleUser(res.data.login.accessToken)
								history.push('/')
							}
						}).catch(err => console.log(err))
					}}
				>
					<input
						type="email"
						value={email}
						onChange={(e): void => setEmail(e.target.value)}
					/>
					<input
						type="password"
						value={password}
						onChange={(e): void => setPassword(e.target.value)}
					/>
					<button>Login</button>
				</FormStyle>
			</div>
		</div>
	)
}
