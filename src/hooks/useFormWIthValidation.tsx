
import React, { useState, useEffect } from 'react'

export const UseFormWithReact = (initialState: any, validate: any): any => {
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

	function handleChange (event: React.FormEvent<HTMLInputElement>): void {
		setValues({
			...values,
			[event.currentTarget.name]: event.currentTarget.value
		})
	}

	function handleBlur (): void {
		const validationErrors = validate(values)
		setErrors(validationErrors)
	}

	function handleSubmit (event: React.FormEvent): void {
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
