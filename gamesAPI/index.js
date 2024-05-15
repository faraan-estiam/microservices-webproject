const port = 8083

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'gamesapi',
  password: 'gamesapiPass?',
  database: 'gamesapi'
})

const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())
app.use(cors())

//get all gamse
app.get('/games', (req, res) => { 
  let query = `
  SELECT *
  FROM games`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    res.send(rows? rows : [])
  })
})


//create a new game
app.post('/games', (req, res) => {
  let title = req.body.title
  let img = req.body.img
  let description = req.body.description
  let releasedate = req.body.releasedate
  let category = req.body.category

  let query = `
  INSERT INTO games (title, img, description, releasedate, category)
  VALUES(?, ?, ?, ?, ?)
  `
  connection.query(query, [title, img, description, releasedate, category], (err, rows, fields) => {
    if (err) {
      res.status(409).send(err.sqlMessage)
    } else {
      res.status(201).send("Game created successfuly")
    }
  })
})

//get info about a game
app.get('/games/:id', (req, res) => { 
  let id = req.params.id
  let query = `
  SELECT *
  FROM games
  WHERE id = ?`
  connection.query(query, [id], (err, rows, fields) => {
    if (err) throw err
    if (!rows[0]) {
      res.status(404).send("Game not found")
    } else {
      res.send(rows[0])
    }
  })
})

//update a game
app.put('/games/:id', (req, res) => {
  let id = req.params.id
  let title = req.body.title
  let img = req.body.img
  let description = req.body.description
  let releasedate = req.body.releasedate
  let category = req.body.category

  let query = `
  UPDATE games
  SET title = ?, img = ?, description = ?, releasedate = ?, category = ?
  WHERE id = ?
  `
  connection.query(query, [title, img, description, releasedate, category, id], (err, rows, fields) => {
    if (err) {
      res.status(409).send(err.sqlMessage)
    } else {
      res.status(201).send(rows.message)
    }
  })
})

app.listen(port, () => {
  connection.connect()
  console.log(`nodeAPI listening on port ${port}`)
})