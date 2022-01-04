import React, { FC, useContext, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Ripples from 'react-ripples';
import { authContext } from '../context/auth';
import './Home.css';
interface Props {}

const GET_USERS = gql`
	query Query {
		users {
			username
			email
			imageURL
		}
	}
`;

interface User {
	username: string;
	email: string;
	imageURL: string;
}

interface QueryData {
	users: User[];
}

const Home: FC<Props> = () => {
	const navigate = useNavigate();
	const context = useContext(authContext);
	const { data, error, loading } = useQuery<QueryData>(GET_USERS);
	// useEffect(() => {
	// 	if (!context.user) {
	// 		navigate('/login');
	// 	}
	// });
	const dMarkup = context.user ? (
		<div>
			<div className='users-container'>
				{data &&
					data.users.map(user => (
						<Ripples key={user.username}>
							<div
								className='user-container'
								onClick={e => {
									setTimeout(() => {
										navigate(`/user/${user.username}`, {
											state: {
												user,
											},
										});
									}, 200);
								}}
							>
								<img src={user.imageURL} alt='profile picture' />
								<div className='user-info'>
									<p> {user.username} </p>
									<p> {user.email} </p>
								</div>
							</div>
						</Ripples>
					))}
			</div>
			<Link onClick={context.logout} to={'/login'}>
				logout
			</Link>
		</div>
	) : (
		<Navigate to={'/login'} />
	);

	return dMarkup;
};

export default Home;
