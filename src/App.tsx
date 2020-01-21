
import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import { Player } from './components/Player'

import { hot } from 'react-hot-loader/root'
import { Routes } from './Routes'
import { setAccessToken } from './accessToken'
import { PlayerContext } from './UseContext'
import { refreshToken, tokenExpiresIn } from './helpers'
import { Episode } from './models/models'

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
  padding-right: 10px;
  padding-left: 10px;
  font-family: 'Avenir';
  background-color: ${(props): string => props.theme.bg};
  color: ${(props): string => props.theme.fontColor};
  min-height: 100vh;
`

interface UserState {
	user: string;
	isLoading: boolean;
}

interface PlayerState {
	episode: Episode | null;
	isPlayerVisible: boolean;
}

const App: React.FC = (): JSX.Element => {
	const [userValues, setUserValues] = useState<UserState>({
		user: '',
		isLoading: false
	})
	const [{ episode, isPlayerVisible }, setPlayerValues] = useState<PlayerState>({
		episode: null,
		isPlayerVisible: false
	})
	const [theme, setTheme] = useState(true)

	const handleThemeState = (): void => {
		setTheme(prevState => !prevState)
	}

	const handleUser = (value: string): void => {
		setUserValues({
			user: value,
			isLoading: false
		})
	}

	useEffect(() => {
		setUserValues({
			...userValues,
			isLoading: true
		})
		refreshToken()
			.then(data => {
				setAccessToken(data.accessToken)
				setUserValues({
					user: data.accessToken,
					isLoading: false
				})
			})
	}, [])

	useEffect(() => {
		setUserValues({
			...userValues,
			isLoading: true
		})
		if (userValues.user) {
			const token = JSON.parse(window.atob(userValues.user.split('.')[1]))
			const timeout = tokenExpiresIn(token.exp)
			setTimeout(() => {
				refreshToken()
					.then(data => {
						setAccessToken(data.accessToken)
						setUserValues({
							user: data.accessToken,
							isLoading: false
						})
					})
			}, timeout - 2000)
		}
		setUserValues({
			...userValues,
			isLoading: false
		})
	}, [userValues.user])

	const user = userValues.user

	return (
		<ThemeProvider theme={theme ? themeLight : themeDark}>
			<Wrapper>
				<PlayerContext.Provider
					value={{
						setPlayerValues,
						handleThemeState,
						user,
						handleUser
					}}
				>
					<Routes user={userValues.user} />
				</PlayerContext.Provider>
				{
					userValues.isLoading && <div>...loading App</div>
				}
				{
					!userValues.isLoading && !userValues.user &&
						<div>login to use the app</div>
				}
				{
					isPlayerVisible &&
						<Player
							currentEpisode={episode}
						/>
				}
			</Wrapper>
			<GlobalStyle />
		</ThemeProvider>
	)
}

export default hot(App)
