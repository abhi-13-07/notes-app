import React, { useState } from 'react';
import AuthApi from '../Api/AuthApi';
import { useAuth } from '../Context/AuthProvider';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Input } from '../Components';

const defaultFormError = {
	email: '',
	password: '',
};

const authApi = new AuthApi();

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formError, setFormError] = useState(defaultFormError);
	const { setAccessToken, setUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const location = useLocation();

	const { msg } = location?.state || { msg: null };

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
					setFormError(prev => ({ ...prev, password: data.message }));
				}
				if (data.message.includes('registered')) {
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
		<section className="center">
			<div className="bg-white">
				<h1 className="text-center">Login</h1>
				{msg && <div className="alert-success">{msg}</div>}
				<form onSubmit={handleSubmit} className="flex-center-column">
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<Input
							type="email"
							id="email"
							placeholder="Eg: xyz@example.com"
							onChange={e => setEmail(e.target.value)}
							value={email}
						/>
						{formError.email && <p className="error-msg">{formError.email}</p>}
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<Input
							type="password"
							id="password"
							placeholder="your password"
							onChange={e => setPassword(e.target.value)}
							value={password}
						/>
						{formError.password && (
							<p className="error-msg">{formError.password}</p>
						)}
					</div>
					<input
						type="submit"
						value={loading ? 'Logging in...' : 'Login'}
						disabled={!canSubmit || loading}
						className="btn-block btn-primary"
						style={{ borderRadius: '5px' }}
					/>
				</form>
				<div className="text-center" style={{ padding: '10px' }}>
					<Link to="/register">Register</Link>
				</div>
			</div>
		</section>
	);
};

export default Login;
