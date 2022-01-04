import React, { FC, useState } from 'react';
const defaultState = {
	email: false,
	password: false,
	username: false,
};
const Form: FC<{
	onSubmit: React.FormEventHandler;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	errors: any;
	action: 'register' | 'login';
}> = ({ onSubmit, onChange, errors, action }) => {
	const [active, setactive] = useState(defaultState);
	const onUnFocus: React.FocusEventHandler<HTMLInputElement> = e => {
		setactive(defaultState);
	};
	const onFocus: React.FocusEventHandler<HTMLInputElement> = e => {
		console.log(e.target);
		setactive({
			...defaultState,
			[e.target.name]: true,
		});
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<label
					className={
						errors.username ? 'invalid' : active.username ? 'active' : ''
					}
					htmlFor='username'
				>
					{errors.username || 'Username'}
				</label>
				<input
					onBlur={onUnFocus}
					onFocus={onFocus}
					required
					type='text'
					name='username'
					id='username'
					onChange={onChange}
				/>
				{action === 'register' && (
					<>
						<label
							className={
								errors.email ? 'invalid' : active.email ? 'active' : ''
							}
							htmlFor='email'
						>
							{errors.email || 'Email'}
						</label>
						<input
							onBlur={onUnFocus}
							onFocus={onFocus}
							required
							type='text'
							id='email'
							name='email'
							onChange={onChange}
						/>
					</>
				)}

				<label
					className={
						errors.password ? 'invalid' : active.password ? 'active' : ''
					}
					htmlFor='password'
				>
					{errors.password || 'Password'}
				</label>
				<input
					onBlur={onUnFocus}
					onFocus={onFocus}
					required
					type='password'
					id='password'
					name='password'
					onChange={onChange}
				/>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
};
export default Form;
