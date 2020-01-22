
import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { RouteComponentProps } from 'react-router'
import { setAccessToken } from '../accessToken'

import { LOGIN } from '../query/query'
import { FormStyle } from './styles/Login'

import { PlayerContext } from '../UseContext'
import { UseFormWithReact } from '../hooks/useFormWIthValidation'
import validate from '../hooks/validate'

const INITIAL_STATE = {
	email: '',
	password: ''
}

export const Login: React.FC<RouteComponentProps> = ({ history }): JSX.Element => {
	const { handleUser } = useContext(PlayerContext)

	const {
		values,
		handleChange,
		handleBlur,
		errors,
		isSubmitting
	} = UseFormWithReact(INITIAL_STATE, validate)

	const [login] = useMutation(LOGIN)

	return (
		<div>
			<div>
				<FormStyle
					onSubmit={(e): void => {
						e.preventDefault()
						const email = values.email
						const password = values.password
						login({
							variables: { email, password }
						}).then(res => {
							if (res && res.data) {
								setAccessToken(res.data.login.accessToken)
								if (handleUser) {
									handleUser(res.data.login.accessToken)
								}
								history.push('/')
							}
						}).catch(err => console.log(err))
					}}
				>
					<div>
						<input
							type="email"
							name="email"
							value={values.email}
							onChange={(e): void => handleChange(e)}
							onBlur={handleBlur}
							className={errors.email && 'input-error'}
						/>
						{
							errors.email &&
								<div className="text-error">
									{errors.email}
								</div>
						}
					</div>
					<div>
						<input
							type="password"
							name="password"
							value={values.password}
							onChange={(e): void => handleChange(e)}
							onBlur={handleBlur}
							className={errors.password && 'input-error'}
						/>
						{
							errors.password &&
								<div className="text-error">
									{errors.password}
								</div>
						}
					</div>
					<button
						disabled={isSubmitting}
					>
						Login
					</button>
				</FormStyle>
			</div>
		</div>
	)
}
