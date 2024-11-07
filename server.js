//load environment variables from .env file
require('dotenv') .config();


//setting up the basic structure for a Node.js server using the Express framework
//importing the Express framework and the MySQL2 library to interact with a MySQL database
const express =require ('express');
const mysql = require('mysql2');
const app = express();


//create a database connection
const db = mysql.createConnection({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
});


//connect to database
db.connect((err) => {
    if (err) {
        console.error('database connection failed: ' + err.stack);
        return;
    }
    console.log("database connected successfully");
});


// Question 1:1. Retrieve all patients
app.get('/patients', (req, res) => {
    const query = `SELECT patient_id, first_name, last_name, date_of_birth FROM patients`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});


// Question 2:2. Retrieve all providers
app.get('/providers', (req,res) =>{
    const query ='SELECT first_name, last_name, provider_specialty FROM providers';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});


// Question 3:3. 3. Filter patients by First Name
app.get('/patients/:first_name', (req, res) => {
    const firstName = req.params.first_name;
    const query = `SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?`;

    db.query(query, [firstName], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});


// Question 4:4. Filter providers by Specialty
app.get('/providers/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const query = `SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?`;

    db.query(query, [specialty], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});


//listen to server
const port = 3001;
app.listen(port, () => {
    console.log('server is running on http ://localhost:${port}');
})