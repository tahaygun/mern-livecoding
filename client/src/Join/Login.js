import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				email: '',
				password: ''
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
		Axios.post('http://localhost:8000/api/login', this.state.formData)
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
					<div className="form-group">
						{errors.email && <p>{errors.email.msg}</p>}
						<input type="email" name="email" onChange={this.changeHandler} placeholder="Enter email" />
					</div>
					<div className="form-group">
						{errors.password && <p>{errors.password.msg}</p>}
						<input onChange={this.changeHandler} name="password" type="password" placeholder="Password" />
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default withRouter(Login);
