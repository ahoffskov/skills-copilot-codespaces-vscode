// Create web server

// 1. Import Express
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

// 2. Setup static folder
app.use(express.static('public'))

// 3. Setup template engine
app.set('view engine', 'hbs')

// 4. Setup router
app.get('/', (req, res) => {
    const comments = JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/comments.json'), { encoding: 'utf-8' }))
    res.render('home', {
        comments: comments
    })
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.get('/detail/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/comments.json'), { encoding: 'utf-8' }))
    const comment = comments.find(cmt => cmt.id === req.params.id)
    res.render('detail', {
        comment: comment
    })
})

app.get('/edit/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/comments.json'), { encoding: 'utf-8' }))
    const comment = comments.find(cmt => cmt.id === req.params.id)
    res.render('edit', {
        comment: comment
    })
})

app.get('/delete/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/comments.json'), { encoding: 'utf-8' }))
    const comment = comments.find(cmt => cmt.id === req.params.id)
    res.render('delete', {
        comment: comment
    })
})

app.get('/search', (req, res) => {
    const comments = JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/comments.json'), { encoding: 'utf-8' }))
    const comment = comments.filter(cmt => cmt.name.toLowerCase().includes(req.query.name.toLowerCase()))
    res.render('search', {
        comments: comment
    })
})

// 5. Start web server
app.listen(3000, () => {
    console.log('Web server running on port 3000')
})