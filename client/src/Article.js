import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import fs from 'fs';
export default class Article extends Component {
	constructor(props) {
		super(props);

		this.state = {
			article: null
		};
	}

	componentDidMount() {
		Axios.get(`http://localhost:8000/api/article/${this.props.match.params.id}`).then(res => {
            localStorage.setItem('article', JSON.stringify(res.data));
			this.setState({ article: res.data });
		});
    }
    
    componentWillMount(){
        let data = localStorage.getItem('article');
        Axios.post('http://localhost:8000/api/article', JSON.parse(data))


    }

	render() {
		let { article } = this.state;
		return (
			article && (
				<div>
					<h3>{article.title}</h3>
					<p>{article.description}</p>
					<small>{article.user.name}</small> <br />
					<Link to="/">Home</Link>
				</div>
			)
		);
	}
}
