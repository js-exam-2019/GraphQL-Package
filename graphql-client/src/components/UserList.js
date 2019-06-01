import React from 'react';
import '../App.css';

export default ({ users }) => {
	if (users.length === 0) return <p>no users</p>;

	const headers = Object.keys(users[0]).slice(0, -1);

	return (
		<>
		<table>
			<thead>
				<tr>
					{headers.map((header) => (
						<th key={header}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{users.map((user, index) => (
					<tr key={index}>
						{Object.keys(user).slice(0, -1).map((key, index) => {
							return (key === "created" || key === "lastUpdated")
								? <td key={index}>{new Date(parseInt(user[key])).toString().slice(0, -38)}</td>
								: <td key={index}>{user[key]}</td>
						})}
					</tr>
				))}
			</tbody>
		</table>
		</>
	);
};
