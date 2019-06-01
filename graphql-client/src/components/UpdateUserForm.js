import React from 'react';
import '../App.css';

export default ({ updatedUser, onChange, submit }) => (
	<form className="form" onSubmit={submit}>
		<FormInput label="email" name="email" type="email" value={updatedUser.email} onChange={onChange}/>
		<FormInput label="first name" name="firstName" value={updatedUser.firstName} onChange={onChange}/>
		<FormInput label="last name" name="lastName" value={updatedUser.lastName} onChange={onChange}/>
		<button type="submit">update</button>
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
