import React, { useState } from 'react';
import formclasses from './FormContact.module.css';

const Input = props => {
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

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await fetch(
				'http://localhost:5000/api/contact',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				}
			);

			const data = await response.json();

			if (data.success) {
				alert('Message Sent Successfully');

				setFormData({
					name: '',
					email: '',
					message: '',
				});
			}
		} catch (error) {
			console.log(error);
			alert('Something went wrong');
		}
	};

	return (
		<form
			className={formclasses['login-form']}
			onSubmit={handleSubmit}>
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
				/>
			</div>

			<button
				className={formclasses.control}
				type='submit'>
				JOIN NOW
			</button>
		</form>
	);
};

export default FormContact;