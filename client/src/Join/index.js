import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
export default class Join extends Component {
	render() {
		return (
			<div>
				<Login />
				<Register />
			</div>
		);
	}
}
