
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Hello: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [{ data, isLoading }, setData] = useState({ data: [], isLoading: true })

	useEffect(() => {
		window.fetch(`https://itunes.apple.com/search?term=${searchQuery}&entity=podcast`)
			.then(x => x.json())
			.then(y => {
				setData({
					data: y.results,
					isLoading: false
				})
			})
	}, [searchQuery])

	return (
		<div>
			<div>
				Hello
			</div>
			<div>
				{
					isLoading && '...loading'
				}
			</div>
			<div>
				<input
					type="text"
					value={searchQuery}
					onChange={(ev): void => setSearchQuery(ev.target.value)}
				/>
			</div>
			<div>
				<ul>
					{
						data.map((item: any): JSX.Element => (
							<Link
								to={{
									pathname: '/podcast',
									state: {
										feedUrl: item.feedUrl
									}
								}}
								key={item.collectionId}
							>
								<img src={item.artworkUrl100} />
							</Link>
						))
					}
				</ul>
			</div>
		</div>
	)
}
