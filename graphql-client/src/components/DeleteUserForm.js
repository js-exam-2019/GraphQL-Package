import React from 'react';
import '../App.css';

export default ({ id, onChange, submit }) => (
	<form className="form" onSubmit={submit}>
		<FormInput label="id" name="id" value={id} onChange={onChange}/>
		<button type="submit">delete</button>
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
