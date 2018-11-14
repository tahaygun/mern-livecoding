import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom'

export default class Messages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			articles: []
		};
	}

    componentDidMount(){
        this.getMessages()
    }

	getMessages = () => {
		Axios.get('http://localhost:8000/api/articles').then(res => this.setState({ articles: res.data }));
	};
	render() {
		let { articles } = this.state;
		return (
			<div>
				<ul>
					{articles.map(article => (
						<li key={article._id} >
							Title:{article.title} <br />
							User:{article.user.name} <br />
                            <Link to={`/article/${article._id}`} >Read more..</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
