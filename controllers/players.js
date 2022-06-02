const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require ('../models')

// router.set('view engine', 'ejs')




//routes
//GET / -- render a form that lets the user search ballIsLife API
router.get('/', (req, res) => {
    res.render('players/index.ejs')
})

//GET / search -- take a search from the user and render the results for them to see
router.get('/search', async (req, res) => {
    try {
        //route logic here
        const playerDetailsUrl = `https://www.balldontlie.io/api/v1/players?search=${req.query.details}`
        const response = await axios.get(playerDetailsUrl)
        res.render('players/results.ejs', {
            players: response.data.data,
            input: req.query.details 
       })
    } catch(err) {
        console.log(err)
    }
})

//POST /faves -- CREATE new fave
router.post('/', async (req, res) => {
    console.log(res.locals.user.id, 'stringsdajkl')
    try {
        const[player, created] = await db.player.findOrCreate({
            where: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                team: req.body.teamName,
                position: req.body.position,
                userId: res.locals.user.id
            }
        })
        console.log(player, 'TEST')
      //redirect to show all faves -- does not exist yet
      res.redirect('/users/yourSquad')
    } catch(err) {
      console.warn(err)
    }
  })


  router.delete('/:id', async (req, res) =>{
    try {
        const delPlayer = await db.player.findByPk(req.params.id)
        await delPlayer.destroy()
        res.redirect("/users/yourSquad")
    } catch (err) {
        console.warn(err)
    }
})


    // try {
    //     const delPlayer = await db.player.findOne(req.params.id)
    //     await delPlayer.destroy()
    // }   
    // delPlayer()


module.exports = router