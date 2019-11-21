
import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import { hot } from 'react-hot-loader/root'
import { Routes } from './Routes'
import { setAccessToken } from './accessToken'

const GlobalStyle = createGlobalStyle`	
	* {
		box-sizing: border-box;
	}
	body {
		background-color: #F7F7F7;
		margin: 0;
	}
`

const theme = {
	bg: 'white',
	font: 'Avenir'
}

const Wrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
  padding-right: 10px;
  padding-left: 10px;
  font-family: ${(props): string => props.theme.font};
  background-color: ${(props): string => props.theme.bg};
`

const App: React.FC = (): JSX.Element => {
	const [{ user, isLoading }, setUser] = useState({
		user: null,
		isLoading: true
	})

	useEffect(() => {
		window.fetch('http://localhost:4000/refresh_token', {
			method: 'POST',
			credentials: 'include'
		}).then(async (res) => {
			const data = await res.json()
			console.log(data)
			setAccessToken(data.accessToken)
			setUser({
				user: data,
				isLoading: false
			})
		})
	}, [])

	console.log(user)

	return (
		<ThemeProvider theme={theme}>
			<Wrapper>
				<Routes />
				{
					isLoading && <div>...loading</div>
				}
			</Wrapper>
			<GlobalStyle />
		</ThemeProvider>
	)
}

export default hot(App)
