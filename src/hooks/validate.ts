
import { KeyValue } from '../models/models'

export default function validate (values: any): any {
	const errors: KeyValue = {}
	if (!values.email) {
		errors.email = 'Required'
	} else if (
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
	) {
		errors.email = 'Invalid email address'
	}

	if (!values.password) {
		errors.password = 'Required'
	} else if (values.password.length < 5) {
		errors.password = 'Must be longer than 5'
	}
	return errors
}
