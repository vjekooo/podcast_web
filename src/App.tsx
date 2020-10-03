import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { hot } from 'react-hot-loader/root'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import { CustomPlayer } from './components/Player/CustomPlayer'

import { Router } from './Routes'
import { setAccessToken } from './accessToken'
import { PlayerContext } from './UseContext'
import { refreshToken } from './helpers'
import { Episode } from './models/models'
import { USER_SETTINGS, SET_THEME } from './query/user_query'

const GlobalStyle = createGlobalStyle`	
	* {
		box-sizing: border-box;
	}
	body {
		background-color: #F7F7F7;
		margin: 0;
	}
	ul {
		list-style-type: none;
		padding-left: 0;
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
	bg: '#212121',
	fontColor: 'white',
	linkColor: 'white',
	linkColorActive: 'gray',
	playerBackground: '#212121',
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
	episode: Episode | null
	isPlayerVisible: boolean
}

const App = (): JSX.Element => {
	const [user, setUser] = useState<string>('')
	const [{ episode, isPlayerVisible }, setPlayerValues] = useState<PlayerState>({
		episode: null,
		isPlayerVisible: false
	})

	const [loadUser, { data: userTheme }] = useLazyQuery(USER_SETTINGS)
	const [setTheme] = useMutation(SET_THEME)

	useEffect(() => {
		const interval = setInterval(() => {
			refreshToken().then((data) => {
				if (data?.accessToken) {
					setAccessToken(data.accessToken)
					setUser(data.accessToken)
				}
			})
		}, 780000)
		return () => clearInterval(interval)
	}, [])

	const handleUser = (value: string): void => {
		setUser(value)
	}

	const changeTheme = (): void => {
		setTheme({
			variables: {
				theme: 'aaa'
			},
			refetchQueries: [{ query: USER_SETTINGS }]
		})
	}

	useEffect(() => {
		refreshToken().then((data) => {
			if (data?.accessToken) {
				setAccessToken(data.accessToken)
				setUser(data.accessToken)
			}
		})
	}, [])

	useEffect(() => {
		if (user) {
			loadUser()
		}
	}, [user])

	const theme = userTheme?.userSettings[0].theme ?? 'light'

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
					<Router />
				</PlayerContext.Provider>
				{isPlayerVisible && <CustomPlayer episode={episode} theme={theme} />}
			</Wrapper>
			<GlobalStyle />
		</ThemeProvider>
	)
}

export default hot(App)
