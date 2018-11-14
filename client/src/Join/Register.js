import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				email: '',
				password: '',
				password_con: '',
				name: ''
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
		Axios.post('http://localhost:8000/api/register', this.state.formData)
			.then(res => {
				this.setState({ success: true });
			})
			.catch(err => {
				this.setState({ ...err.response.data }, () => console.log(this.state.errors));
			});
	};

	render() {
		let { errors, success } = this.state;
		return (
			<div>
				<form onSubmit={this.formHandler}>
					{errors.auth && <p>{errors.auth.msg}</p>}
					{success && <p>You are registered successfully!</p>}
					<h1>Login</h1>
					<div>
						{errors.email && <p>{errors.email.msg}</p>}
						<input type="email" name="email" onChange={this.changeHandler} placeholder="Enter email" />
					</div>
					<div>
						{errors.password && <p>{errors.password.msg}</p>}
						<input onChange={this.changeHandler} name="password" type="password" placeholder="Password" />
					</div>
					<div>
						{errors.password_con && <p>{errors.password_con.msg}</p>}
						<input onChange={this.changeHandler} name="password_con" type="password" placeholder="Password Confirmation" />
					</div>
					<div>
						{errors.name && <p>{errors.name.msg}</p>}
						<input onChange={this.changeHandler} name="name" type="text" placeholder="Name" />
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default withRouter(Register);
