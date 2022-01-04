import { gql, useMutation } from '@apollo/client';
import React, { FC, useContext, useState } from 'react';
import Form from '../components/Form';
import './Auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { authContext } from '../context/auth';
interface registerData {
	username: string;
	email: string;
	imageURL: string;
	token: string;
}

interface variablesState {
	username: string;
	email: string;
	password: string;
}
type key = 'username' | 'email' | 'password';
const REGISTER = gql`
	mutation Register($username: String!, $email: String!, $password: String!) {
		register(username: $username, email: $email, password: $password) {
			username
			email
			imageURL
			token
		}
	}
`;
const Register: FC = props => {
	const context = useContext(authContext);
	const navigate = useNavigate();
	const [merrors, setMerrors] = useState<any>({
		email: '',
		password: '',
		username: '',
	});
	const [variables, setvariables] = useState<variablesState>({
		username: '',
		email: '',
		password: '',
	});
	const [register_user, { data, loading, error }] = useMutation<
		{ register: registerData },
		variablesState
	>(REGISTER, {
		onError: e => {
			setMerrors(e.graphQLErrors[0].extensions.errors);
		},
		onCompleted: data => {
			context.login(data.register);
			console.log(data.register);
			localStorage.setItem('token', data.register.token);
			setMerrors({});
			navigate('/');
		},
	});
	const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		setvariables({
			...variables,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		console.log(variables);
		register_user({
			variables,
		});
	};
	return (
		<div className='register'>
			<div className='container'>
				<h1 className='title'>Register</h1>
				<Form
					action='register'
					onSubmit={onSubmit}
					onChange={onChange}
					errors={merrors}
				/>
				<small>
					already have an account ? <Link to={'/login'}>login</Link>
				</small>
			</div>
		</div>
	);
};

export default Register;
