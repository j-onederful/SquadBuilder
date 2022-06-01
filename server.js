require('dotenv').config()
// required packages
const express = require('express')
const rowdy = require('rowdy-logger')
const cookieParser = require('cookie-parser')
const db = require('./models')
const methodOverride = require('method-override')
const cryptoJS = require('crypto-js')

// app config
const PORT = process.env.PORT || 3000
const app = express()
app.set('view engine', 'ejs')

// middlewares
const rowdyRes = rowdy.begin(app)
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(methodOverride('_method'))

//DIY middleware
// happens on every request
app.use((req, res, next)=> {
  //debugging request logger
  console.log(`[${new Date().toLocaleString()}] incoming request: ${req.method} ${req.url}`)
  console.log('request body:', req.body)
  // modify the response to give data to the routes/middleware that is 'downstream'
  res.locals.myData = 'hi, i came from a middleware'
  //tell express the middleware is done
  next()
})

//auth middleware
app.use( async (req, res, next) => {
  try {
    //if there is a cookie --
    if (req.cookies.userId) {
      //try to find that user in the db
      const userId = req.cookies.userId
      const decryptedId = cryptoJS.AES.decrypt(userId, process.env.ENC_KEY).toString(cryptoJS.enc.Utf8)
      const user = await db.user.findByPk(decryptedId)
      //mount the found user on the res.locals so that routes can access the logged in user
      // any value on the res.locals is available to the layout
      res.locals.user = user
    } else {
      // the user is explicitly not logged in
      res.locals.user = null
    }
     // go to the next route/middleware
     next()
  } catch (err) {
    console.log(err)
  }
}) 

// routes
app.get('/', (req, res) => {
  console.log(res.locals)
  res.render('index')
})

// controllers
app.use('/users', require('./controllers/users'))
app.use('/players', require('./controllers/players'))


// 404 error handler -- NEEDS TO GO LAST
app.use((req, res, next) => {
  //render a 404 template
  res.status(404).render('404.ejs')
})

//500 error handler
//needs to have all 4 parameters
app.use((error, req, res, next) => {
  //log the error
  console.log(error)
  // send a 500 error template
  res.status(500).render('500.ejs')
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  rowdyRes.print()
})
