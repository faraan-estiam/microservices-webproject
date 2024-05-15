const port = 8082

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'usersapi',
  password: 'usersapiPass?',
  database: 'usersapi'
})

const express = require('express')
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

//create a new user
app.post('/users', (req, res) => {
  let id = req.body.id
  let firstname = req.body.firstname
  let lastname = req.body.lastname
  let email = req.body.email
  let birthdate = req.body.birthdate
  let bio = req.body.bio
  let discord = req.body.discord

  let query = `
  INSERT INTO users (id, firstname, lastname, email, birthdate, bio, discord)
  VALUES( ?, ?, ?, ?, ?, ?, ?)
  `
  connection.query(query, [id, firstname, lastname, email, birthdate, bio, discord], (err, rows, fields) => {
    if (err) {
      res.status(409).send(err.sqlMessage)
    } else {
      res.status(201).send("User created successfuly")
    }
  })
})

//get info about an user
app.get('/users/:id', (req, res) => { 
  let id = req.params.id
  let query = `
  SELECT *
  FROM users
  WHERE id = ?`
  connection.query(query, [id], (err, rows, fields) => {
    if (err) throw err
    if (!rows[0]) {
      res.status(404).send("User not found")
    } else {
      res.send(rows[0])
    }
  })
})

app.listen(port, () => {
  connection.connect()
  console.log(`nodeAPI listening on port ${port}`)
})