import styled from 'styled-components'

export const FormStyle = styled.form`
	display: flex;
	flex-direction: column;
	padding: 2rem 2rem 0 2rem;
	> div {
		margin-bottom: 1rem;
	}
	input {
		width: 100%;
		margin-bottom: 0.3rem;
		min-height: 30px;
		font-size: 14px;
	}
	.input-error {
		border: 1px solid red;
	}
	.text-error {
		color: red;
		font-size: 12px;
	}
	button {
		margin-top: 0.5rem;
		height: 30px;
	}
`

export const InputStyle = styled.input``
