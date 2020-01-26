
import React from 'react'
import { ModalStyle } from './styles/Modal'
import { ApolloError } from 'apollo-boost'

interface Props {
	setModalStatus: (status: boolean) => void;
	value?: ApolloError | undefined;
}

export const Modal: React.FC<Props> = ({ setModalStatus, value }) => {
	return (
		<ModalStyle>
			<div>
				<button
					type="button"
					onClick={(): void => setModalStatus(false)}
				>
					close
				</button>
			</div>
			<div>
				{
					value &&
						JSON.stringify(value)
				}
			</div>
		</ModalStyle>
	)
}
