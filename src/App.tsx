
import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import { hot } from 'react-hot-loader/root'
import { Routes } from './Routes'
import { setAccessToken } from './accessToken'
import { PlayerContext } from './UseContext'
import { Player } from './components/Player'

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
	const [{ episode, isPlayerVisible }, setPlayerValues] = useState({
		episode: null,
		isPlayerVisible: false
	})

	useEffect(() => {
		async function fetchRefreshToken (): Promise<void> {
			const response = await window.fetch('http://localhost:4000/refresh_token', {
				method: 'POST',
				credentials: 'include'
			})

			const data = await response.json()

			if (!data) return

			setAccessToken(data.accessToken)
			setUser({
				user: data,
				isLoading: false
			})
		}
		fetchRefreshToken()
	}, [])

	console.log(user)

	return (
		<ThemeProvider theme={theme}>
			<Wrapper>
				<PlayerContext.Provider value={{ setPlayerValues }}>
					<Routes />
				</PlayerContext.Provider>
				{
					isLoading && <div>...loading</div>
				}
				{
					isPlayerVisible &&
						<Player
							setValues={setPlayerValues}
							currentEpisode={episode}
						/>
				}
			</Wrapper>
			<GlobalStyle />
		</ThemeProvider>
	)
}

export default hot(App)
