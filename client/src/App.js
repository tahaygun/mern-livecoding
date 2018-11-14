import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import Home from './Home';
import Join from './Join/';
import CreatePost from './CreatePost'
import Article from './Article'
Axios.defaults.withCredentials= true;
class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/join" component={Join} />
					<Route exact path="/create-post" component={CreatePost} />
					<Route exact path="/article/:id" component={Article} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
