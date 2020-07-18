import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useNavigate } from 'react-router-dom'

import { setAccessToken } from '../../accessToken'
import { LOGIN, REGISTER } from '../../query/user_query'

import { PlayerContext } from '../../UseContext'
import { UseFormWithReact } from '../../hooks/useFormWIthValidation'
import styled from 'styled-components'

const INITIAL_STATE = {
	email: '',
	password: ''
}

export const Login = (): JSX.Element => {
	const navigate = useNavigate()
	const { handleUser } = useContext(PlayerContext)

	const { values, handleChange, handleBlur, errors, isSubmitting } = UseFormWithReact(INITIAL_STATE)

	const [login, { error: loginError }] = useMutation(LOGIN)
	const [register, { error: registerError }] = useMutation(REGISTER)

	const location = window.location.pathname

	const handleLogin = async (): Promise<void> => {
		const email = values.email
		const password = values.password

		try {
			const data = await login({
				variables: { email, password }
			})
			if (data) {
				setAccessToken(data.data.login.accessToken)
				if (handleUser) {
					handleUser(data.data.login.accessToken)
				}
				navigate('/')
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handleRegister = async (): Promise<void> => {
		const email = values.email
		const password = values.password
		try {
			const data = await register({
				variables: { email, password }
			})
			if (data) {
				navigate('/')
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			<div>
				<Form
					onSubmit={(e): void => {
						e.preventDefault()
						if (location === '/login') {
							handleLogin()
						} else {
							handleRegister()
						}
					}}
				>
					<div>
						<Label>E-mail</Label>
						<Input
							type="email"
							name="email"
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							className={errors?.email && 'input-error'}
						/>
						{errors?.email && <div className="text-error">{errors?.email}</div>}
					</div>
					<div>
						<Label>Password</Label>
						<Input
							type="password"
							name="password"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							className={errors?.password && 'input-error'}
						/>
						{errors?.password && <div className="text-error">{errors?.password}</div>}
					</div>
					{loginError && <div className="text-error">{loginError}</div>}
					{registerError && <div className="text-error">{registerError}</div>}
					<Button disabled={isSubmitting || Boolean(Object.keys(errors).length)}>Login</Button>
				</Form>
			</div>
		</div>
	)
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	padding: 2rem 2rem 0 2rem;
	> div {
		margin-bottom: 1rem;
	}
	.input-error {
		border: 1px solid red;
	}
	.text-error {
		color: red;
		font-size: 12px;
	}
`

const Input = styled.input`
	width: 100%;
	margin-bottom: 0.3rem;
	min-height: 30px;
	font-size: 14px;
`

const Label = styled.label`
	font-size: 12px;
`

const Button = styled.button`
	margin-top: 0.5rem;
	height: 30px;
`
