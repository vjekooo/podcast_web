import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useNavigate } from 'react-router-dom'

import { REGISTER } from '../../query/user_query'

import { FormStyle } from '../Login/style'
import { UseFormWithReact } from '../../hooks/useFormWIthValidation'

const INITIAL_STATE = {
	email: '',
	password: ''
}

export const Register = (): JSX.Element => {
	const navigate = useNavigate()

	const { values, handleChange, handleBlur, errors, isSubmitting } = UseFormWithReact(INITIAL_STATE)

	const [register] = useMutation(REGISTER)

	return (
		<div>
			<div>
				<FormStyle
					onSubmit={async (e): Promise<void> => {
						e.preventDefault()
						const email = values.email
						const password = values.password
						try {
							const data = await register({
								variables: { email, password }
							})
							if (data) {
								navigate('/')
							}
						} catch (error) {
							console.log(error)
						}
					}}
				>
					<div>
						<label>E-mail</label>
						<input
							name="email"
							type="email"
							placeholder="email"
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							className={errors?.email && 'input-error'}
						/>
						{errors?.email && <div className="text-error">{errors?.email}</div>}
					</div>
					<div>
						<label>Password</label>
						<input
							name="password"
							type="password"
							placeholder="password"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							className={errors?.email && 'input-error'}
						/>
						{errors?.password && <div className="text-error">{errors?.password}</div>}
					</div>
					<button disabled={isSubmitting || Boolean(Object.keys(errors).length)}>Register</button>
				</FormStyle>
			</div>
		</div>
	)
}
