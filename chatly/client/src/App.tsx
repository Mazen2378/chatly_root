import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/auth';
import User from './pages/User';
function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/user/:username' element={<User />} />
				<Route path='/' element={<Home />} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
