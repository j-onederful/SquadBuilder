const express = require('express')
const router = express.Router()
const db = require ('../models')
const cryptoJS = require('crypto-js')
const bcrypt = require('bcryptjs')

// GET /users/new -- renders a form to create a new user
router.get('/new', (req,res) => {
    res.render('users/new.ejs', {msg: null})
})


// POST /users --creates a new user and redirects to index
router.post('/', async (req, res, next) => {
    try {
        //try to create the user
        //hash password
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)
        const [user, created] = await db.user.findOrCreate({
            where: { email: req.body.email},
            defaults: { password: hashedPassword,
                        teamName: req.body.teamName
             }
        })

        // if the user is new
        if (created) {
            //log them in by giving them cookie
            // res.cookie('cookie name', cookie data)
            const encryptedId = cryptoJS.AES.encrypt(user.id.toString(), process.env.ENC_KEY).toString()
            res.cookie('userId', encryptedId)
            //redirect to the homepage (in the future this could redirect elsewhere)
            res.redirect('/users/yourSquad')
        } else {
            //if the user was not created
            //re render the login form with a message for the user
            console.log('that email already exists')
            res.render('users/new.ejs', {msg: 'email already taken, idiot'})
        }
    } catch(err) {
        next(err)
    }
})


// GET /users/login -- renders a login form
router.get('/login', (req, res) => {
    res.render('users/login.ejs', {msg: null})
})


// POST /users/login -- authenticates user credentials against the database
router.post('/login', async (req, res, next) => {
    try {
        //look up the user in the db based on their email
        const foundUser = await db.user.findOne({
            where: {email: req.body.email}
        })
        const msg = 'bad login credentials, ur not authenticated'
        //if the user is not found -- display the login form and give them a message
        if (!foundUser) {
            console.log('email not found on login')
            res.render('users/login.ejs', {msg})
            return //do not continue with the function
        }
        
        //otherwise, check the provided password against the password in the database
        //hash the password from the req.boy and compare it to the db password
        const compare = bcrypt.compareSync(req.body.password, foundUser.password)
        if (compare) {
            //if they match -- send the user a cookie! to log them in 
            const encryptedId = cryptoJS.AES.encrypt(foundUser.id.toString(), process.env.ENC_KEY).toString()
            res.cookie('userId', encryptedId)
            //TODO: redirect to yourSquad
            res.redirect('/users/yourSquad')
        } else {
            // if not -- render the login form with a message
            res.render('users/login.ejs', {msg})
        }
    } catch (err) {
        next(err)
    }
})


// GET /users/logout -- clear the cookie to log the user out
router.get('/logout', (req, res) => {
    //clear the cookie from storage
    res.clearCookie('userId')
    //redirect to root
    res.redirect('/')
})

router.get('/yourSquad', async (req, res) => {
    //check if user is authorized
    if (!res.locals.user) {
        //if user is not authorized ask them to log in
        res.render('users/login.ejs', { msg: 'gotta login little guy'})
        return // end the route here
    }
    //make favorited player list appear on your squad page
    const userSquad = await db.player.findAll({
        where: {
            userId: res.locals.user.id
        }
    })
    const comments = await res.locals.user.getComments()
    console.log(comments, "HERE I AM!!!!!")
    res.render('users/yourSquad', {user: res.locals.user, userSquad, comments})
})

//GET - shows list of other user's teams
router.get('/', async (req,res) => {
    try {
        // get all teamNames from user db
        const allTeamNames = await db.user.findAll()
        res.render('users/otherSquads.ejs', { allTeamNames })
        //render otherSquads page (list of other user's team names)

        // NOTE: RENDERING SQUAD NAMES BUT your team name is showing as well (look into sequelize query methods to exclude where current id)
    } catch (err) {
        console.warn(err)
    }
})

// GET - shows individual users team when their teamName clicked on in users/otherSquads 
router.get('/:id', async (req, res) => {
    const userSquad = await db.player.findAll({
        where: {
            userId: req.params.id
        }
    })
    const comments = await db.comment.findAll({
        where: {
            userId: req.params.id
        }
    })
    const rivalName = await db.user.findOne({
        where: {
            id: req.params.id
        }
    })
    console.log(userSquad, "RIGHT HUR")
    res.render('users/rivalTeam.ejs', {userSquad, comments, rivalName, rivalId: req.params.id,})
})

// POST - adds new comment with content and name to database with what was entered into form on rivalTeam.ejs
router.post('/:id/comment', async (req, res) => {
    console.log('current user', res.locals.user.id)
    console.log('rival user', req.params.id)
    try {
        const[newComment, created] = await db.comment.findOrCreate({
            where: {
                content: req.body.content,
                name: req.body.name,
                userId: req.params.id
            }
        })
        console.log(newComment, 'TESTER MY G')
        res.redirect(`/users/${req.params.id}`)
    } catch (err) {
        console.warn(err)
    }
}) 

// PUT - update users teamName
router.put('/yourSquad', async (req, res) => {
    const updateName = await db.user.findByPk(res.locals.user.id)
    updateName.teamName = req.body.teamName
    await updateName.save()
    console.log(updateName)
    res.redirect("/users/yourSquad")
})

module.exports = router