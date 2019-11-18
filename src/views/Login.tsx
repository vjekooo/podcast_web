
import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { RouteComponentProps } from 'react-router'
import { setAccessToken } from '../accessToken'

const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			accessToken
		}
	}
`

export const Login: React.FC<RouteComponentProps> = ({ history }): JSX.Element => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [login] = useMutation(LOGIN)

	return (
		<div>
			<div>
				<form
					onSubmit={(e): void => {
						e.preventDefault()
						login({ variables: { email, password } })
							.then(res => {
								if (res && res.data) {
									setAccessToken(res.data.login.accessToken)
									history.push('/')
								}
							})
							.catch(err => console.log(err))
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
				</form>
			</div>
		</div>
	)
}
