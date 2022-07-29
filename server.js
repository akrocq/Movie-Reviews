let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const { ReadStream } = require('fs');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/getQuery', (req, res) => {

	let movie = req.body.movie;
	let director = req.body.director;
	let actor = req.body.actor;
	
	let connection = mysql.createConnection(config);

	let sql = 'Select name, concat(first_name, " ", last_name) as dname from movies, movies_directors, directors where movies.name = ? and movies_directors.movie_id = movies.id and movies_directors.director_id = directors.id';
	
	// 'Select name, first_name, last_name from a3larocq.movies, a3larocq.directors, a3larocq.movies_directors, a3larocq.roles, a3larocq.actors, where a3larocq.movies.name = ?, and ';

	let data = [movie];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getQueryTwo', (req, res) => {

	let movie = req.body.movie;
	let director = req.body.director;
	let actor = req.body.actor;
	
	let connection = mysql.createConnection(config);

	let sql = 'Select reviewContent from a3larocq.Review, a3larocq.movies where a3larocq.Review.movies_id = a3larocq.movies.id and a3larocq.movies.name = ?';
	
	// 'Select name, first_name, last_name from a3larocq.movies, a3larocq.directors, a3larocq.movies_directors, a3larocq.roles, a3larocq.actors, where a3larocq.movies.name = ?, and ';

	let data = [movie];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getFiveStarMovies', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `select name, id from a3larocq.movies, a3larocq.Review where a3larocq.movies.id=a3larocq.Review.movies_id and a3larocq.Review.reviewScore=5;`;

	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM a3larocq.movies;`;
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});


app.post('/api/addReview', (req, res) => {
	let userID = req.body.userID;
	let movieID = req.body.movieID;
	let title = req.body.title;
	let body = req.body.body;
	let rating = req.body.rating;

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO a3larocq.Review(reviewTitle, reviewContent, reviewScore, user_userID, movies_id) VALUES (?, ?, ?, ?, ?);`;
	let data = [title, body, rating, userID, movieID];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}


	});
	connection.end();
});

/**
 * addReview API 
 * define 5 variables 
 * sql statement should be "INSERT INTO..... "
 */


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
