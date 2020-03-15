
import React from 'react'

import { RequestsMain } from './styles/Requests'

interface Requests {
	id: string;
	requestee?: string;
	requestor?: string;
}

interface Props {
	list: Requests[];
	handleClick: (id: number, target: string, state: string) => void;
	target: string;
}

export const Requests = ({ list, handleClick, target }: Props): JSX.Element => {
	return (
		<RequestsMain>
			{
				list?.map((item: any, index: number) => {
					return (
						<ul>
							<li
								key={index}
							>
								<div>
									<span>
										{item[target]}
									</span>
									{
										target === 'requestor' &&
											<div>
												<button
													onClick={
														(): void => handleClick(
															item.id,
															item[target], 'accept'
														)
													}
												>
													acc
												</button>
												<button
													onClick={
														(): void => handleClick(
															item.id,
															item[target], 'decline'
														)
													}
												>
													dec
												</button>
											</div>
									}
								</div>
							</li>
						</ul>
					)
				})
			}
		</RequestsMain>
	)
}
