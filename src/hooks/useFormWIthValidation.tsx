import React, { useState, useEffect, FormEvent } from 'react'
import validate from './validate'
import { LooseObject } from '../models/models'

export interface InitialState {
	email?: string
	password?: string
}

interface FormValues {
	values: InitialState
	errors: LooseObject
	isSubmitting: boolean
	handleChange: (event: FormEvent<HTMLInputElement>) => void
	handleSubmit: (event: FormEvent<HTMLInputElement>) => void
	handleBlur?: (event: FormEvent<HTMLInputElement>) => void
}

export const UseFormWithReact = (initialState: InitialState): FormValues => {
	const [values, setValues] = useState(initialState)
	const [errors, setErrors] = useState({})
	const [isSubmitting, setSubmitting] = useState(false)

	useEffect(() => {
		if (isSubmitting) {
			const noErrors = Object.keys(errors).length === 0
			if (noErrors) {
				setSubmitting(false)
			} else {
				setSubmitting(false)
			}
		}
	}, [errors])

	function handleChange(event: React.FormEvent<HTMLInputElement>): void {
		setValues({
			...values,
			[event.currentTarget.name]: event.currentTarget.value
		})

		const validationErrors = validate(values, event.currentTarget.name)
		setErrors(validationErrors)
	}

	function handleBlur(event: React.FormEvent<HTMLInputElement>): void {
		const validationErrors = validate(values, event.currentTarget.name)
		setErrors(validationErrors)
	}

	function handleSubmit(event: React.FormEvent): void {
		event.preventDefault()
		const validationErrors = validate(values)
		setErrors(validationErrors)
		setSubmitting(true)
	}

	return {
		handleChange,
		values,
		handleSubmit,
		handleBlur,
		errors,
		isSubmitting
	}
}
