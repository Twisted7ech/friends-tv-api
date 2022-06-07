const express = require('express')
const app = express()
const PORT = 8000

const quotes = {
    'id0':{
        'rank': 0,
        'character': 'unknown',
        'phrase': 'unknown',
        'season': 'unknown',
        'episode': 'unknown',
        'timeMin': 'unknown'
    },
    'id1':{
        'rank': 1,
        'character': 'Joey',
        'phrase': 'Could I be wearing more clothes?',
        'season': 1,
        'episode': 1,
        'timeMin': 5
    },
    'id2':{
        'rank': 1,
        'character': 'Chandler',
        'phrase': "Join me, won't you",
        'season': 10,
        'episode': 17,
        'timeMin': 12
    },
    'id3':{
        'rank': 1,
        'character': 'Phoebe',
        'phrase': "Which one, I'll try and slip it into my purse",
        'season': 10,
        'episode': 17,
        'timeMin': 19
    }

}

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (request, response) =>{
    const quote = request.params.name.toLowerCase()
    if ( quotes[quote]){
        response.json(quotes[quote])
    }else {
        response.json(quotes['unknown'])
    }
})




app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})