import React, { useState } from 'react';
import formclasses from './FormContact.module.css';

const Input = (props) => {
	return (
		<div className={formclasses.controls}>
			<input
				autoComplete='off'
				spellCheck='false'
				className={formclasses.control}
				type={props.type}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
				required
			/>
			<div id='spinner' className={formclasses.spinner}></div>
		</div>
	);
};

const FormContact = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		try {
			const response = await fetch(
				'https://fitness-website-1-uze3.onrender.com/api/contact',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				}
			);

			const data = await response.json();

			if (response.ok && data.success) {
				alert('Message Sent Successfully ✅');

				setFormData({
					name: '',
					email: '',
					message: '',
				});
			} else {
				alert(data.message || 'Failed to send message');
			}
		} catch (error) {
			console.error(error);
			alert('Server error. Please try again later.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			className={formclasses['login-form']}
			onSubmit={handleSubmit}
		>
			<div className={formclasses.inputdiv}>
				<Input
					placeholder='Name'
					type='text'
					name='name'
					value={formData.name}
					onChange={handleChange}
				/>

				<Input
					placeholder='Email'
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
				/>

				<textarea
					className={`${formclasses.control} ${formclasses['login-form__textarea']}`}
					placeholder='Type your message here.'
					name='message'
					value={formData.message}
					onChange={handleChange}
					required
				/>
			</div>

			<button
				className={formclasses.control}
				type='submit'
				disabled={loading}
			>
				{loading ? 'Sending...' : 'JOIN NOW'}
			</button>
		</form>
	);
};

export default FormContact;