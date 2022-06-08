const express = require('express')
const app = express()
const PORT = 8000

const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'friends-tv-api'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})



app.get('/',(request, response)=>{
    db.collection('quotes').find().sort({rank: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addQuote', (request, response) => {
    db.collection('quotes').insertOne({character: request.body.character,
    phrase: request.body.phrase, season: request.body.season, episode: request.body.episode, time: request.body.time, rank: 0})
    .then(result => {
        console.log('Quote Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneRank', (request, response) => {
    db.collection('quotes').updateOne({character: request.body.character,
        phrase: request.body.phrase, season: request.body.season, episode: request.body.episode, time: request.body.time, rank: request.body.rank},{
        $set: {
            rank:request.body.rank + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Rank')
        response.json('Rank Added')
    })
    .catch(error => console.error(error))

})

// app.delete('/deleteRapper', (request, response) => {
//     db.collection('quotes').deleteOne({stageName: request.body.stageNameS})
//     .then(result => {
//         console.log('Rapper Deleted')
//         response.json('Rapper Deleted')
//     })
//     .catch(error => console.error(error))

// })
    

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

