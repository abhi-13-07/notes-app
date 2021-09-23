import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, Spinner } from '../Components';
import AuthApi from '../Api/AuthApi';

const defaultForm = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const authApi = new AuthApi();

const Register = () => {
	const [formData, setFormData] = useState(defaultForm);
	const [formError, setFormError] = useState(defaultForm);
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const canSubmit = () => {
		let form = true;
		Object.values(formData).forEach(value => {
			if (!value) form = false;
		});

		return form;
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data, status } = await authApi.register(formData);
			if (status !== 201) {
				setLoading(false);
				const { errors } = data;
				errors.forEach(error => {
					setFormError(prev => ({ ...prev, [error.param]: error.msg }));
				});
				return;
			}
			setLoading(false);
			return history.push('/login', { msg: data.message });
		} catch (err) {
			setLoading(false);
			console.log('Register Error: ', err);
		}
	};

	return (
		<section className="center">
			<div className="bg-white">
				<h1 className="text-center">Register</h1>
				<form onSubmit={handleSubmit} className="flex-center-column">
					<div className="form-group">
						<label htmlFor="">Name</label>
						<Input
							type="text"
							placeholder="Eg: abc"
							name="name"
							onChange={e =>
								setFormData(prev => ({
									...prev,
									[e.target.name]: e.target.value,
								}))
							}
						/>
						{formError.name && <p className="error-msg">{formError.name}</p>}
					</div>
					<div className="form-group">
						<label htmlFor="">Email</label>
						<Input
							type="email"
							placeholder="Eg: abc@example.com"
							name="email"
							onChange={e =>
								setFormData(prev => ({
									...prev,
									[e.target.name]: e.target.value,
								}))
							}
						/>
						{formError.email && <p className="error-msg">{formError.email}</p>}
					</div>
					<div className="form-group">
						<label htmlFor="">Password</label>
						<Input
							type="password"
							placeholder="your password"
							name="password"
							onChange={e =>
								setFormData(prev => ({
									...prev,
									[e.target.name]: e.target.value,
								}))
							}
						/>
						{formError.password && (
							<p className="error-msg">{formError.password}</p>
						)}
					</div>
					<div className="form-group">
						<label htmlFor="">Confirm Password</label>
						<Input
							type="password"
							placeholder="confirm your password"
							name="confirmPassword"
							onChange={e =>
								setFormData(prev => ({
									...prev,
									[e.target.name]: e.target.value,
								}))
							}
						/>
						{formError.confirmPassword && (
							<p className="error-msg">{formError.confirmPassword}</p>
						)}
					</div>
					<button
						className="btn-block btn-primary"
						disabled={!canSubmit() || loading}
						style={{ borderRadius: '5px' }}
					>
						{loading ? <Spinner size="30" /> : 'Register'}
					</button>
				</form>
				<div className="text-center" style={{ padding: '10px' }}>
					<Link to="/login">Login</Link>
				</div>
			</div>
		</section>
	);
};

export default Register;
