
import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useNavigate } from 'react-router-dom'

import { REGISTER } from '../query/user_query'

import { FormStyle } from './styles/Login'
import { UseFormWithReact } from '../hooks/useFormWIthValidation'

import validate from '../hooks/validate'

const INITIAL_STATE = {
	email: '',
	password: ''
}

export const Register = (): JSX.Element => {
	const navigate = useNavigate()

	const {
		values,
		handleChange,
		handleBlur,
		errors,
		isSubmitting
	} = UseFormWithReact(INITIAL_STATE, validate)

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
						<input
							name="email"
							type="email"
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
							name="password"
							type="password"
							value={values.password}
							onChange={(e): void => handleChange(e)}
							onBlur={handleBlur}
							className={errors.email && 'input-error'}
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
						Register
					</button>
				</FormStyle>
			</div>
		</div>
	)
}
