
import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import App from './App'
import { getAccessToken } from './accessToken'

const client = new ApolloClient({
	// uri: 'http://localhost:4000/graphql',
	uri: 'ec2-63-32-44-201.eu-west-1.compute.amazonaws.com:4000/graphql',
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
