
import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import { CustomPlayer } from './components/CustomPlayer'

import { hot } from 'react-hot-loader/root'
import { Routes } from './Routes'
import { setAccessToken } from './accessToken'
import { PlayerContext } from './UseContext'
import { refreshToken } from './helpers'
import { Episode } from './models/models'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { GET_USER, SET_THEME } from './query/query'
import useTimeout from './hooks/useTimeout'

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

	const [loadUser, { data: userTheme }] = useLazyQuery(GET_USER)
	const [setTheme] = useMutation(SET_THEME)

	useTimeout((): any =>
		refreshToken()
			.then(data => {
				setAccessToken(data.accessToken)
				setUser(data.accessToken)
			})
	, 840000)

	const handleUser = (value: string): void => {
		setUser(value)
	}

	const changeTheme = (): void => {
		setTheme({
			variables: {
				theme: 'aaa'
			},
			refetchQueries: [{ query: GET_USER }]
		})
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
			loadUser()
		}
	}, [user])

	// useEffect(() => {
	// 	if (user) {
	// 		loadUser()
	// 		refreshToken()
	// 			.then(data => {
	// 				setAccessToken(data.accessToken)
	// 				setUser(data.accessToken)
	// 			})
	// 		const token = JSON.parse(window.atob(user.split('.')[1]))
	// 		const timeout = tokenExpiresIn(token)
	// 		setTimeout(() => {
	// 			refreshToken()
	// 				.then(data => {
	// 					setAccessToken(data.accessToken)
	// 					setUser(data.accessToken)
	// 				})
	// 		}, timeout - 2000)
	// 	}
	// }, [user])

	const theme = userTheme?.user[0].theme || 'light'

	return (
		<ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
			<Wrapper>
				<PlayerContext.Provider
					value={{
						setPlayerValues,
						handleUser,
						user,
						theme,
						changeTheme
					}}
				>
					<Routes />
				</PlayerContext.Provider>
				{
					isPlayerVisible &&
						<CustomPlayer
							episode={episode}
							theme={theme}
						/>
				}
			</Wrapper>
			<GlobalStyle />
		</ThemeProvider>
	)
}

export default hot(App)
