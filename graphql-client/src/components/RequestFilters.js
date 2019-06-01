import React from 'react';
import '../App.css';

export default ({ updateRequest }) => (
	<section className="filterContainer">
		<Filter value="_id" onChange={updateRequest} />
		<Filter value="firstName" onChange={updateRequest} />
		<Filter value="lastName" onChange={updateRequest} />
		<Filter value="email" onChange={updateRequest} />
		<Filter value="password" onChange={updateRequest} />
		<Filter value="created" onChange={updateRequest} />
		<Filter value="lastUpdated" onChange={updateRequest} />
	</section>
);

const Filter = ({ value, onChange }) => (
	<label className="filter">
		{value}
		<input type="checkbox" value={value} onChange={onChange} defaultChecked />
	</label>
);
