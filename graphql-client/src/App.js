import React, { useEffect, useState } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import './App.css';

import RequestFilters from './components/RequestFilters';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';
import UpdateUserForm from './components/UpdateUserForm';
import DeleteUserForm from './components/DeleteUserForm';

const uri = 'http://localhost:5000';
const client = new ApolloClient({ uri });

export default () => {
	const [users, setUsers] = useState([]);
	const [createUser, setCreateUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	});

	const [updatedUser, setUpdatedUser] = useState({
		firstName: '',
		lastName: '',
		email: ''
	});

	const [deletedUser, setDeletedUser] = useState({ id: '' });

	let [request, setRequest] = useState([
		'_id',
		'firstName',
		'lastName',
		'email',
		'password',
		'created',
		'lastUpdated'
	]);

	const updateRequest = async ({ target }) => {
		target.checked
			? request.push(target.value)
			: (request = request.filter((req) => req !== target.value));
		setRequest(request);
		await getAllUsers(client, request, setUsers);
	};

	const updateCreateUser = ({ target }) => {
		createUser[target.name] = target.value;
		setCreateUser({ ...createUser });
	};

	const updateUpdateUser = ({ target }) => {
		updatedUser[target.name] = target.value;
		setUpdatedUser({ ...updatedUser });
	};

	const updateDeletedUser = ({ target }) => {
		deletedUser[target.name] = target.value;
		setDeletedUser({ ...deletedUser });
	};

	const getAllUsers = async () => {
		const QUERY = gql(`
			query {
				users {
					${request.join(' ')}
				}
			}
		`);

		const { data } = await client.query({ query: QUERY, fetchPolicy: 'no-cache' });
		setUsers(data.users);
	};

	const addUser = async (evt) => {
		evt.preventDefault();
		const QUERY = gql(`
			mutation($user: AddUserInput!) {
				userAdd(input: $user) {
					${request.join(' ')}
				}
			}
		`);

		await client.mutate({
			mutation: QUERY,
			variables: { user: createUser }
		});

		await getAllUsers(client, request, setUsers);

		setCreateUser(() => {
			Object.keys(createUser).forEach((key) => (createUser[key] = ''));
			return createUser;
		});
	};

	useEffect(() => {
		getAllUsers();
	}, [users.length, request]);

	const updateUser = async (evt) => {
		evt.preventDefault();
		const QUERY = gql(`
			mutation($email: String!, $firstName: String!, $lastName: String!) {
				userUpdate(email: $email, firstName: $firstName, lastName: $lastName) {
					${request.join(' ')}
				}
			}
		`);

		const response = await client.mutate({
			mutation: QUERY,
			variables: { ...updatedUser }
		});

		console.log(response.data.userUpdate);
		await getAllUsers(client, request, setUsers);

		setUpdatedUser(() => {
			Object.keys(updatedUser).forEach((key) => (updatedUser[key] = ''));
			return createUser;
		});
	};

	const deleteUser = async (evt) => {
		evt.preventDefault();
		const QUERY = gql(`
			mutation($_id: ID!) {
				userDelete(_id: $_id) {
					${request.join(' ')}
				}
			}
		`);

		const response = await client.mutate({
			mutation: QUERY,
			variables: { _id: deletedUser.id }
		});

		console.log(response.data.userDelete);
		await getAllUsers(client, request, setUsers);
		setDeletedUser({ id: '' });
	};

	return (
		<ApolloProvider client={client}>
			<h1>Apollo Clint</h1>
			<div className="listView">
				<div className="filters">
					<RequestFilters updateRequest={updateRequest} />
					<button onClick={async () => await getAllUsers(client, request, setUsers)}>
						refresh
					</button>
				</div>
				<UserList users={users} />
			</div>
			<hr />
			<AddUserForm newUser={createUser} onChange={updateCreateUser} submit={addUser} />
			<hr />
			<div className="formContainer">
				<UpdateUserForm
					updatedUser={updatedUser}
					onChange={updateUpdateUser}
					submit={updateUser}
				/>

				<DeleteUserForm
					id={deleteUser.id}
					onChange={updateDeletedUser}
					submit={deleteUser}
				/>
			</div>
		</ApolloProvider>
	);
};
