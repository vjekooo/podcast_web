import React from 'react'
import { ApolloError } from 'apollo-boost'
import styled from 'styled-components'

interface Props {
	setModalStatus: (status: boolean) => void
	value?: ApolloError | undefined
}

export const Modal: React.FC<Props> = ({ setModalStatus, value }) => {
	return (
		<ModalStyle>
			<div>
				<button type="button" onClick={(): void => setModalStatus(false)}>
					close
				</button>
			</div>
			<div>{value && JSON.stringify(value)}</div>
		</ModalStyle>
	)
}

const ModalStyle = styled.div`
	width: 90%;
	height: 50%;
`
