import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Messages from './Messages';
export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			istAuth: false,
			randomArticle: null
		};
	}

	componentWillMount() {
		Axios.get('http://localhost:8000/api/authorization')
			.then(res => this.setState({ istAuth: true }))
			.catch(err => this.setState({ istAuth: false }));
		this.getRandomOne();
	}

	getRandomOne = () => {
		Axios.get('http://localhost:8000/api/random-article').then(res => this.setState({ randomArticle: res.data }));
	};

	render() {
		let { randomArticle, istAuth } = this.state;
		return (
			<div>
				<div>{istAuth ? <Link to="/create-post"> Create Post </Link> : <Link to="/join">Login - Register</Link>}</div>

				{this.state.randomArticle && (
					<div>
						<h3>Random Article</h3>
						<ul>
							<li>
								Title:{randomArticle.title} <br />
								User:{randomArticle.user.name} <br />
								<Link to={`/article/${randomArticle._id}`}>Read more..</Link>
							</li>
						</ul>
					</div>
				)}
				<h3>Latest Messages</h3>
				<Messages />
			</div>
		);
	}
}
