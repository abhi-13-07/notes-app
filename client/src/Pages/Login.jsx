import React, { useState } from 'react';
import AuthApi from '../Api/AuthApi';
import { useAuth } from '../Context/AuthProvider';
import { useHistory } from 'react-router-dom';

const defaultFormError = {
	email: '',
	password: '',
};

const authApi = new AuthApi();

/* 
  TODO: complete login, add validation
*/

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formError, setFormError] = useState(defaultFormError);
	const { setAccessToken, setUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const canSubmit =
		(email && password) || formError.password || formError.email;

	const validate = (email, password) => {
		if (!email) {
			setFormError(prev => ({ ...prev, email: 'Email is required!' }));
			return false;
		}

		if (!password) {
			setFormError(prev => ({ ...prev, password: 'Password is required!' }));
			return false;
		}

		return true;
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setFormError(defaultFormError);

		const isValid = validate(email, password);

		if (!isValid) {
			return;
		}

		try {
			const success = await login();
			if (success) {
				setEmail('');
				setPassword('');
				history.push('/');
			} else {
				console.log('Error while logging in');
			}
		} catch (err) {
			// TODO: handle error
			console.log(err);
		}
	};

	const login = async () => {
		try {
			setLoading(true);
			const { data, status } = await authApi.login({ email, password });

			if (status === 200) {
				setAccessToken(data.accessToken);
				setUser(data.user);
				setLoading(false);
				return true;
			} else {
				if (data.message.includes('Password')) {
					console.log('found password error');
					setFormError(prev => ({ ...prev, password: data.message }));
				}
				if (data.message.includes('registred')) {
					console.log('found email error');
					setFormError(prev => ({ ...prev, email: data.message }));
				}
				setLoading(false);
				return false;
			}
		} catch (err) {
			console.log('login component: ', err);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						placeholder="Eg: xyz@example.com"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
					{formError.email && <p>{formError.email}</p>}
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						placeholder="your password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
					{formError.password && <p>{formError.password}</p>}
				</div>
				<input
					type="submit"
					value={loading ? 'Logging in...' : 'Login'}
					disabled={!canSubmit || loading}
				/>
			</form>
		</div>
	);
};

export default Login;
