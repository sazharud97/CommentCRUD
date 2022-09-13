const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
// importing uuid v4 as "uuid"
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

let comments = [
    {
        id: uuid(),
        username: 'wamuu-kun',
        comment: 'tee hee you are so funny bebe wow'
    },
    {
        id: uuid(),
        username: 'skuyler',
        comment: 'I like to watch bird with the boss.'
    },
    {
        id: uuid(),
        username: 'deifiedBDN',
        comment: 'delete your account and life pls thank you'
    },
    {
        id: uuid(),
        username: 'arf',
        comment: 'arf arf arf arf'
    }
]

// ----- GETTING ALL COMMENTS -----
app.get('/comments', function (req, res) {
    res.render('comments/index', { comments })
    console.log(comments)
})

// ----- GETTING COMMENT CREATE PAGE -----
app.get('/comments/new', function (req, res) {
    res.render('comments/new')
})

// ----- POSTING NEW COMMENTS -----
app.post('/comments', function (req, res) {
    //pulling matching values from req body.
    //so "req.body.username" = "username"
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    // redirects user to "comments" page
    res.redirect('/comments')
})

// ----- GETTING INDIVIDUAL COMMENT DETAILS BY ID -----
app.get('/comments/:id', (req, res) => {
    // taking ID from url
    const { id } = req.params;
    // finding a comment w/ ID matching one passed in URL
    const comment = comments.find(c => c.id === id);
    // passing found comment to render template
    res.render('comments/show', { comment })
})

// ----- GETTING FORM FOR EDITING COMMENT -----
app.get('/comments/:id/edit', (req, res) => {
    // taking ID from url
    const { id } = req.params;
    // finding a comment w/ ID matching one passed in URL
    const comment = comments.find(c => c.id === id);
    // rendering "edit" template w/ found comment
    res.render('comments/edit', { comment })
})

// ----- EDITING COMMENT TEXT THRU REQ BODY -----
app.patch('/comments/:id', (req, res) => {
    // taking ID from url
    const { id } = req.params;
    // storing what was sent in the request body/ payload
    const newCommentText = req.body.comment;
    // finding a comment w/ ID matching one passed in URL
    const foundComment = comments.find(c => c.id === id);
    // replacing said comment's text w/ text from request body
    foundComment.comment = newCommentText;
    // redirect to index
    res.redirect('/comments')
})

// ----- DELETING COMMENT -----
app.delete('/comments/:id', (req, res) => {
    // taking ID from url
    const { id } = req.params;
    // filtering out everything that ISN'T selected comment into new array
    comments = comments.filter(c => c.id !== id)
    // redirect to index
    res.redirect('/comments')
})

app.listen(3000, () => {
    console.log("listening to port 3000")
})