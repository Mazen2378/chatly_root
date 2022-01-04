import React, { useReducer, createContext, FC } from 'react';
import jwtDecode from 'jwt-decode';
interface User {
	__typename?: string;
	username: string;
	email?: string;
	imageURL?: string;
	token?: string;
}

interface AuthContext {
	user: User | null;
	login: (data: any) => void;
	logout: () => void;
}

export const authContext = createContext<AuthContext>({
	user: null,
	login: data => {},
	logout: () => {},
});

const authReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'LOGOUT':
			return {
				...state,
				user: null,
			};
		case 'LOGIN':
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};
let user: User | null = null;
const token = localStorage.getItem('token');
if (token) {
	user = {
		username: jwtDecode<{
			username: string;
			iat: string;
		}>(token).username,
	};
}

export const AuthProvider: FC = props => {
	const [state, dispatch] = useReducer(authReducer, { user });
	const login = (data: any) => {
		dispatch({ type: 'LOGIN', payload: data });
	};
	const logout = () => {
		localStorage.removeItem('token');
		dispatch({ type: 'LOGOUT' });
	};
	return (
		<authContext.Provider
			value={{
				user: state.user,
				login,
				logout,
			}}
			{...props}
		/>
	);
};
