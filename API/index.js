
const express = require('express')
const app = express()
const port = 5000
const axios = require('axios')
const md5 = require('md5')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))



// login route 
app.post('/login', (req, res) => {
  axios.post('https://api.betaseries.com/members/auth', {
    login: req.body.login,
    password: md5(req.body.password),
    client_id: '  ',
  })
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      console.log(error)
    })
})

// manage friends route
// token : 7863c7083522

// ajouter un ami

app.post('/api/addFriends', (req, res) => {
  // console.log(req.body);
  axios.post('https://api.betaseries.com/friends/friend',{
    id: req.body.id,
    token: "d9f7494c47b1",
    client_id: "3bee3373bb7d"
})
    .then(response => {
      res.json(response.data)
      console.log(response);
    })
    .catch(error => {
      console.log(error)
    })
})

// delete un ami

app.delete('/api/removeFriends', (req, res) => {
  // console.log(req.body);
  axios.delete('https://api.betaseries.com/friends/friend', {
    headers: {
      Authorization: "Bearer " + req.body.token,
    },

    data: {
      id: req.body.id,
      token: "d9f7494c47b1",
      client_id: "3bee3373bb7d"
    }
  })
    .then(response => {
      console.log(response)
      res.json(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}),


 // blocker un user 

 app.post('/api/blockFriends', (req, res) => {
  // console.log(req.body);
  axios.post('https://api.betaseries.com/friends/block',
    req.body
  )
    .then(response => {
      res.json(response.data)
      console.log(response);
    })
    .catch(error => {
      console.log(error)
    })
})


// debloquer un ami
 
app.delete('/api/deblockFriends', (req, res) => {
  // console.log(req.body);
  axios.delete('https://api.betaseries.com/friends/block', {
    headers: {
      Authorization: "Bearer " + req.body.token,
    },

    data: {
      id: req.body.id,
      token: "d9f7494c47b1",
      client_id: "3bee3373bb7d"
    }
  })
    .then(response => {
      console.log(response)
      res.json(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}),


//  Listage des amis 

app.get('/api/listFriends', (req, res) => {
  // console.log(req.body);
  axios.get('https://api.betaseries.com/friends/list', {

    data: {
      id: req.headers.id,
      token: "d9f7494c47b1",
      client_id: "3bee3373bb7d"
    }
  })
    .then(response => {
      console.log(response)
      res.json(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}),


// rechercher d'user terminer la recherche par % pour lister 

app.get('/api/searchFriends', (req, res) => {
  console.log(req.headers);
  axios.get('https://api.betaseries.com/members/search', {

    data: {
      login: req.headers.login + "%",
      client_id: "3bee3373bb7d",
      limit: 20,
    
    }
  })
    .then(response => {
      console.log(response.data)
      res.json(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}),



  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })