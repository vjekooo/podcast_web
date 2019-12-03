
import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import { hot } from 'react-hot-loader/root'
import { Routes } from './Routes'
import { setAccessToken } from './accessToken'
import { PlayerContext } from './UseContext'
import { Player } from './components/Player'
import { refreshToken } from './helpers'

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

interface UserState {
	user: string;
	isLoading: boolean;
}

const App: React.FC = (): JSX.Element => {
	const [{ user, isLoading }, setUser] = useState<UserState>({
		user: '',
		isLoading: true
	})
	const [{ episode, isPlayerVisible }, setPlayerValues] = useState({
		episode: null,
		isPlayerVisible: false
	})

	useEffect(() => {
		refreshToken()
			.then(data => {
				setAccessToken(data.accessToken)
				setUser({
					user: data.accessToken,
					isLoading: false
				})
			})
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
