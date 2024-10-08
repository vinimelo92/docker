const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = process.env.PORT

app.use(express.json())

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

connection.connect((err) => {
    if (err) {
        console.error('Error to connect into database:', err);
        return;
    }
    console.log('Connection sucessfully done.');
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS people (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )
    `;
    
    connection.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log('Table "people" is ready.');
    });
});

app.get('/', (req, res) => {
    connection.query('SELECT * FROM people', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }

        res.send(`
            <h1>Full Cycle Rocks!</h1>
            ${results && results.length > 0 ? `
                <ul>
                    ${results.map(person => `<li>${person.name}</li>`).join('')}
                </ul>
            ` : '<p>No names found</p>'}
        `);
    });
});

app.post('/add', (req, res) => {
    const { name } = req.body;
    connection.query('INSERT INTO people (name) VALUES (?)', [name], (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Error inserting data' });
        }

        return res.status(201).json({ message: 'Name added successfully', name });
    })
})

app.listen(port, () => {
    console.log(`Node app listening`)
})