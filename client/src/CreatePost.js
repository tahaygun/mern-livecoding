import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class CreatePost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				title: '',
				description: '',
				keywords: '',
				summary: ''
			},
			errors: {}
		};
	}

	changeHandler = e => {
		var formData = this.state.formData;
		formData[e.target.name] = e.target.value;
		this.setState({ formData });
	};

	formHandler = e => {
		e.preventDefault();
		Axios.post('http://localhost:8000/api/article', this.state.formData)
			.then(res => {
				this.props.history.push('/');
			})
			.catch(err => {
				this.setState({ ...err.response.data }, () => console.log(this.state.errors));
			});
	};

	render() {
		let { errors } = this.state;
		return (
			<div>
				<form onSubmit={this.formHandler}>
					{errors.auth && <p>{errors.auth.msg}</p>}
					<h1>Login</h1>
					<div>
						{errors.title && <p>{errors.title.msg}</p>}
						<input type="text" name="title" onChange={this.changeHandler} placeholder="Title" />
					</div>
					<div>
						{errors.keywords && <p>{errors.keywords.msg}</p>}
						<input type="text" name="keywords" onChange={this.changeHandler} placeholder="keywords" />
					</div>
					<div>
						{errors.summary && <p>{errors.summary.msg}</p>}
						<input type="text" name="summary" onChange={this.changeHandler} placeholder="summary" />
					</div>
					<div>
						{errors.description && <p>{errors.description.msg}</p>}
						<textarea name="description" onChange={this.changeHandler} placeholder="description" />
					</div>

					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default withRouter(CreatePost);
