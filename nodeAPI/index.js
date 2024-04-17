const port = 8081

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'nodeapi',
  password: 'nodeapiPass?',
  database: 'microservices'
})

const express = require('express')
const session = require('express-session')
const bodyParser = require("body-parser")

const app = express()
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(bodyParser.json())

//ask server if user is authenticated
app.get('/auth', (req, res) => {
  if (req.session.isLogged) {
    res.send({ userId: req.session.userId })
  } else {
    res.status(401).send("User not authenticated")
  }
})

//create a new user
app.post('/auth/signup', (req, res) => {
  if (req.session.isLogged) {
    res.send("User already authenticated")
    return
  }
  let firstname = req.body.firstname
  let lastname = req.body.lastname
  let username = req.body.username
  let password = req.body.password
  let query = `
  INSERT INTO users (firstname, lastname, email, pass)
  VALUES( ?, ?, ?, ?)
  `
  connection.query(query, [firstname, lastname, username, password], (err, rows, fields) => {
    if (err) {
      res.status(409).send(err.sqlMessage)
    } else {
      res.status(201).send("User created successfuly")
    }
  })
})

//login user
app.post('/auth/login', (req, res) => {
  if (req.session.isLogged) {
    res.send("User already authenticated")
    return
  }

  let username = req.body.username;
  let password = req.body.password;
  let query = `
  SELECT id
  FROM users
  WHERE email = ? AND pass = ?
  `
  connection.query(query, [username, password], (err, rows, fields) => {
    if (err) throw err
    if (rows.length > 0) {
      req.session.isLogged = true
      req.session.userId = rows[0].id
      res.send("User authentication success")
    } else {
      res.status(401).send("User authentication failed")
    }
  })
})

//disconnect a user
app.post('/auth/disconnect', (req, res) => {
  if (!req.session.isLogged) {
    res.status(401).send("User not authenticated")
    return
  }
  req.session.isLogged = false
  res.send("User disconnected successfuly")
})

//get info about current user
app.get('/auth/me', (req, res) => {
  if (!req.session.isLogged) {
    res.status(401).send("User not authenticated")
    return
  }

  let query = `
  SELECT id, firstname, lastname, email
  FROM users
  WHERE id = ?`
  connection.query(query, [req.session.userId], (err, rows, fields) => {
    if (err) throw err
    res.send(rows[0])
  })
})

app.listen(port, () => {
  connection.connect()
  console.log(`nodeAPI listening on port ${port}`)
})