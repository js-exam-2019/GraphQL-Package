import React from 'react';
import '../App.css';

export default ({ newUser, onChange, submit }) => (
	<form className="form" onSubmit={submit}>
		<FormInput label="first name" name="firstName" value={newUser.firstName} onChange={onChange}/>
		<FormInput label="last name" name="lastName" value={newUser.lastName} onChange={onChange}/>
		<FormInput label="email" name="email" type="email" value={newUser.email} onChange={onChange}/>
		<FormInput label="password" name="password" type="password" value={newUser.password} onChange={onChange}/>
		<button type="submit">save</button>
	</form>
);

const FormInput = ({ label, name, type, value, onChange }) => (
	<div className="formInput">
		<label>{label}</label>
		<input
			type={type}
			placeholder={label}
			name={name}
			value={value}
			onChange={onChange}
			required
		/>
	</div>
);
