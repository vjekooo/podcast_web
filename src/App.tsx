
import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import { CustomPlayer } from './components/CustomPlayer'

import { hot } from 'react-hot-loader/root'
import { Routes } from './Routes'
import { setAccessToken } from './accessToken'
import { PlayerContext } from './UseContext'
import { refreshToken, tokenExpiresIn } from './helpers'
import { Episode } from './models/models'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from './query/query'

const GlobalStyle = createGlobalStyle`	
	* {
		box-sizing: border-box;
	}
	body {
		background-color: #F7F7F7;
		margin: 0;
	}
`

const themeLight = {
	bg: 'white',
	fontColor: 'black',
	linkColor: 'blue',
	linkColorActive: 'red',
	playerBackground: 'whitesmoke',
	switcher: 'black'
}

const themeDark = {
	bg: 'black',
	fontColor: 'white',
	linkColor: 'white',
	linkColorActive: 'gray',
	playerBackground: 'black',
	switcher: 'yellow'
}

const Wrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
  font-family: 'Avenir';
  background-color: ${(props): string => props.theme.bg};
  color: ${(props): string => props.theme.fontColor};
  min-height: 100vh;
`

interface PlayerState {
	episode: Episode | null;
	isPlayerVisible: boolean;
}

const App: React.FC = (): JSX.Element => {
	const [user, setUser] = useState<string>('')
	const [{ episode, isPlayerVisible }, setPlayerValues] = useState<PlayerState>({
		episode: null,
		isPlayerVisible: false
	})

	const { data: theme } = useQuery(GET_USER)

	const handleUser = (value: string): void => {
		setUser(value)
	}

	useEffect(() => {
		refreshToken()
			.then(data => {
				setAccessToken(data.accessToken)
				setUser(data.accessToken)
			})
	}, [])

	useEffect(() => {
		if (user) {
			refreshToken()
				.then(data => {
					setAccessToken(data.accessToken)
					setUser(data.accessToken)
				})
			const token = JSON.parse(window.atob(user.split('.')[1]))
			const timeout = tokenExpiresIn(token)
			setTimeout(() => {
				refreshToken()
					.then(data => {
						setAccessToken(data.accessToken)
						setUser(data.accessToken)
					})
			}, timeout - 2000)
		}
	}, [user])

	const currentTheme = theme?.user[0].theme

	return (
		<ThemeProvider theme={currentTheme === 'light' ? themeLight : themeDark}>
			<Wrapper>
				<PlayerContext.Provider
					value={{
						setPlayerValues,
						handleUser,
						user,
						theme
					}}
				>
					<Routes />
				</PlayerContext.Provider>
				{
					isPlayerVisible &&
						<CustomPlayer
							episode={episode}
							theme={currentTheme}
						/>
				}
			</Wrapper>
			<GlobalStyle />
		</ThemeProvider>
	)
}

export default hot(App)
