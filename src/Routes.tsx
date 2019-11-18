import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './views/Home'
import { Search } from './views/Search'
import { Podcast } from './components/Podcast'
import { Header } from './components/Header'
import { Login } from './views/Login'
import { Register } from './views/Register'

export const Routes: React.FC = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/podcast" component={Podcast} />
				<Route component={(): JSX.Element => <div>404</div>} />
			</Switch>
		</Router>
	)
}
