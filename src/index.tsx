import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import App from './App'
import { getAccessToken } from './accessToken'

const uri = process.env.GQ_ENDPOINT

const client = new ApolloClient({
	uri: uri,
	credentials: 'include',
	request: (operation): void => {
		const accessToken = getAccessToken()
		if (accessToken) {
			operation.setContext({
				headers: {
					authorization: `bearer ${accessToken}`
				}
			})
		}
	}
})

render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('app')
)
