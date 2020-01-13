
import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { RouteComponentProps } from 'react-router-dom'

import { REGISTER } from '../query/query'

import { FormStyle } from './styles/Login'

export const Register: React.FC<RouteComponentProps> = ({ history }): JSX.Element => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [register] = useMutation(REGISTER)

	return (
		<div>
			<div>
				<FormStyle
					onSubmit={async (e): Promise<void> => {
						e.preventDefault()
						try {
							const data = await register({
								variables: { email, password }
							})
							if (data) {
								history.push('/')
							}
						} catch (error) {
							console.log(error)
						}
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
					<button>Register</button>
				</FormStyle>
			</div>
		</div>
	)
}
