import { gql, parseAndCheckHttpResponse, useQuery } from '@apollo/client';
import React, { FC, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

interface Props {}

const GET_USER = gql`
	query User($username: String!) {
		user(username: $username) {
			username
			email
			imageURL
		}
	}
`;

interface QueryVariables {
	username: string;
}
interface LocationState {
	user: {
		username: string;
		email: string;
		imageURL: string;
	};
}
const UserDisplay: FC = props => {
	const params = useParams();
	const location = useLocation();
	const state = location.state as LocationState;
	const { data, loading, error } = useQuery(GET_USER, {
		variables: {
			username: params.username,
		},
	});
	console.log(location.state);
	if (loading) return <h1>loading</h1>;
	if (data)
		return (
			<div className='container'>
				<img src={data.user.imageURL} alt='' />
				<h1>{data.user.username}</h1>
				<h1>{data.user.email}</h1>
			</div>
		);
	if (error) return <h1>404 user NOT found</h1>;
	return <h1>hi</h1>;
};

export default UserDisplay;
