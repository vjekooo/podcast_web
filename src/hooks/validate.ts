import { LooseObject } from '../models/models'
import { InitialState } from './useFormWIthValidation'

export default function validate(values: InitialState, pointer?: string): LooseObject {
	const errors: LooseObject = {}
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}

	if (!values.password) {
		errors.password = 'Required'
	} else if (values.password.length < 5) {
		errors.password = 'Must be longer than 5'
	}

	if (pointer && errors[pointer]) {
		return {
			[pointer]: errors[pointer]
		}
	} else {
		return {}
	}
}
