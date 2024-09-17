// Retrieve the list of all users
// Add a new user (The request body should contain name, email, company name and company email)
// Retrieve a specific user by ID
// Update a specific user by ID
// Delete a specific user by ID

const express = require('express');
const cors = require('cors');
const app = require('express')();

app.use(cors());

app.use(express.json());

let db = [];
let id = 0;

app.get('/users', (req, resp) => {
	return resp.status(200).json({
		message: 'All Users',
		data: db,
	});
});

app.post('/users', (req, res) => {
	const {name, email, company} = req.body;

	const user = {id, name, email, company};
	db.push(user);

	res.status(201).json({
		message: 'User Created Successfully',
		data: user,
	});
	id += 1;
});

app.get('/users/:id', (req, res) => {
	const userId = parseInt(req.params.id);
	const user = db.find((user) => user.id === userId);

	if (user) {
		return res.status(200).json({
			message: 'User Fetched Successfully',
			data: user,
		});
	}

	return res.status(404).json({
		message: 'User Not Found',
		data: null,
	});
});

app.patch('/users/:id', (req, res) => {
	const {name, email, company} = req.body;
	const userId = parseInt(req.params.id);

	const user = db.find((user) => user.id === userId);

	if (user) {
		user.name = name || user.name;
		user.email = email || user.email;
		user.company = company || user.company;

		return res.status(200).json({
			message: 'User Updated Successfully',
			data: user,
		});
	}

	return res.status(404).json({
		message: 'User Not Found',
		data: null,
	});
});

app.delete('/users/:id', (req, res) => {
	const userId = parseInt(req.params.id);

	const userIndex = db.findIndex((user) => user.id === userId);
	if (userIndex !== -1) {
		db.splice(userIndex, 1);
		return res.status(200).json({
			message: 'User Deleted Successfully',
			data: null,
		});
	} else {
		return res.status(404).json({
			message: 'User Not Found',
			data: null,
		});
	}
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
