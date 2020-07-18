import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './views/Home/Home'
import { Search } from './views/Search/Search'
import { Podcast } from './components/Podcast/Podcast'
import Header from './components/Header/Header'
import { Login } from './views/Login/Login'
import { Favorites } from './views/Favorites/Favorites'
import { Account } from './views/Account/Account'
import { Friends } from './views/Friends/Friends'
import { History } from './views/History/History'

export const Router = (): JSX.Element => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Login />} />
				<Route path="/search" element={<Search />} />
				<Route path="/podcast" element={<Podcast />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/account" element={<Account />} />
				<Route path="/friends" element={<Friends />} />
				<Route path="/history" element={<History />} />
				<Route element={<div>404</div>} />
			</Routes>
		</BrowserRouter>
	)
}
