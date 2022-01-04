import { gql, useMutation } from '@apollo/client';
import React, { FC, useState, useContext } from 'react';
import Form from '../components/Form';
import './Auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { authContext } from '../context/auth';
interface loginData {
	username: string;
	email: string;
	imageURL: string;
	token: string;
}

interface variablesState {
	username: string;
	password: string;
}
type key = 'username' | 'email' | 'password';
const LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			username
			imageURL
			token
			email
		}
	}
`;
const Login: FC = props => {
	const context = useContext(authContext);
	const navigate = useNavigate();
	const [merrors, setMerrors] = useState<any>({
		password: '',
		username: '',
	});
	const [variables, setvariables] = useState<variablesState>({
		username: '',
		password: '',
	});
	const [register_user, { data, loading, error }] = useMutation<
		{ login: loginData },
		variablesState
	>(LOGIN, {
		onError: e => {
			setMerrors(e.graphQLErrors[0].extensions.errors);
		},
		onCompleted: data => {
			context.login(data.login);
			console.log(data.login);
			localStorage.setItem('token', data.login.token);
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
				<h1 className='title'>Login</h1>
				<Form
					action='login'
					onSubmit={onSubmit}
					onChange={onChange}
					errors={merrors}
				/>
				<small>
					don't have an account ? <Link to={'/register'}>register</Link>
				</small>
			</div>
		</div>
	);
};

export default Login;
