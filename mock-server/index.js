import express from 'express'
import responseContent from './data/sample-response.json' with { type: 'json' }
const app = express()
const port = 3000

// implement here mocked endpoints to imitate backend response

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/user', (req, res) => {
    res.send(responseContent)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})