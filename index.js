const Joi = require('joi');
// import express function
const express = require('express');
// create app from express
const app = express();

app.use(express.json()); // adding middleware to parse json from body of req

const genres = [
	{ id: 1, name: 'action' },
	{ id: 2, name: 'adventure' },
	{ id: 3, name: 'comedy' },
	{ id: 4, name: 'horror' },
	{ id: 5, name: 'sci-fi' },
];

app.get('/', (req, res) => {
	res.send('hello');
});

// GET list of all genres
app.get('/api/genres', (req, res) => {
	res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
	const genre = genres.find((g) => g.id === +req.params.id);

	if (!genre) return res.status(404).send('id: does not match any genre');
	res.send(genre);
});

// HTTP DELETE Request
app.delete('/api/genres/:id', (req, res) => {
	const genre = genres.find((g) => g.id === +req.params.id);

	if (!genre) return res.status(404).send('id: does not match any genre');
	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	res.send(genre);
});
// HTTP POST Request

app.post('/api/genres', (req, res) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});
	const { error, value } = schema.validate(req.body);
	if (!error) {
		genres.push({ id: genres.length + 1, name: value.name });
		res.send(genres);
	} else {
		res.status(400).send(error.details[0].message);
		return;
	}
});

// HTTP UPDATE Request
app.put('/api/genres/:id', (req, res) => {
	const genre = genres.find((g) => g.id === +req.params.id);

	if (!genre) return res.status(404).send('id: does not match any genre');

	const { error, value } = validate(req.body);
	if (!error) {
		genre.name = value.name;
		res.send(genre);
	} else {
		// 400 Bad request
		res.status(400).send(error.details[0].message);
		return;
	}
});
// find genre with req id
// validate req body
function validate(params) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});
	return schema.validate(params);
}

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
