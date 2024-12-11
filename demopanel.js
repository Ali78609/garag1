// import dotenv from 'dotenv'
// dotenv.config()
// import express from 'express'
// import nodemailer from 'nodemailer'
// import cors from 'cors'
// import { body , validationResult } from 'express-validator'
// import { nanoid } from 'nanoid'
// import path from 'path'
// import cookieParser from 'cookie-parser'
// import bodyParser from 'body-parser'
// import nunjucks from 'nunjucks'
// import fs from 'fs'
// import url from 'url'
// import http from 'http'
// import { hash } from 'crypto'
// import { error } from 'console'


// const app = express()

// const DB = {
//     users: [{ _id: nanoid(), username: 'admin', password: '220802', }],
//     sessions:{}
// }

// const mimeTypes = {
//     '.html': 'text/html',
//     '.js': 'text/javascript',
//     '.css': 'text/css'
// }

// function staticFile(res, filePath , ext){
//     res.setHeader('Content-Type', mimeTypes[ext])
//     fs.readFile('./public' + filePath , (error, data)=>{
//         if (error){
//             res.statusCode = 404
//             res.end()
//         }
//         res.end(data)
//     })
// }

// const findUsername = async (username) =>
//     DB.users.find((u) => u.username === username)

// const findSession = async (sessionId) =>{
//     const userId = DB.sessions[sessionId]
//     if(!userId){
//         return
//     }
//     return DB.users.find((u)=> u._id === userId)
// }

// const createSession = async userId =>{
//     const sessionId = nanoid()
//     DB.sessions[sessionId] = userId
//     return sessionId
// }

// const deletesession = async (sessionId) =>{
//     delete DB.sessions[sessionId]
// }

// const auth = () => async (req ,res, next)=>{
//     if(!req.cookies['sessionId']){
//         return next()
//     }
//     const user = await findSession(req.cookies['sessionId'])
//     req.user = user
//     req.sessionId = req.cookies['sessionId']
//     next()
// }

// http.createServer(function(req,res){
//     let url = req.url
//     console.log(url)

//     switch (url){
//         case '/login':
//             console.log('login page')
//             staticFile(res , '/html/login.html', '.html')
//             break
//         case '/admin':
//                 console.log('admin page')
//                 staticFile(res , '/html/admin.html', '.html')
                

//                 break
            
//             default:
//                 const extname = String(path.extname(url)).toLocaleLowerCase()
//                 if (extname in mimeTypes) staticFile(res , url , extname)
//                     else{
//                 res.statusCode = 404
//                 res.end()
//                     }
//     }
// }).listen(3500)

// const app = express()

// const port = process.env.PORT || 3500

// const DB = {
//     users: [{ _id: nanoid(), username: 'admin', password: '220802', books: 0, }],
//     sessions:{}
// }

// const mimeTypes = {
//     '.html': 'text/html',
//     '.js': 'text/javascript',
//     '.css': 'text/css'
// }

// function staticFile(res, filePath , ext){
//     res.setHeader('Content-Type', mimeTypes[ext])
//     fs.readFile('./public' + filePath , (error, data)=>{
//         if (error){
//             res.statusCode = 404
//             res.end()
//         }
//         res.end(data)
//     })
// }
// const findUsername = async (username) =>
//     DB.users.find((u) => u.username === username)

// const findSession = async (sessionId) =>{
//     const userId = DB.sessions[sessionId]
//     if(!userId){
//         return
//     }
//     return DB.users.find((u)=> u._id === userId)
// }

// const createSession = async userId =>{
//     const sessionId = nanoid()
//     DB.sessions[sessionId] = userId
//     return sessionId
// }

// const deletesession = async (sessionId) =>{
//     delete DB.sessions[sessionId]
// }

// nunjucks.configure('views', {
//     autoescape: true,
//     express: app,
// })
// app.set("view engine", 'njk');

// app.use(cookieParser())

// app.use(express.static(path.join(__dirname , 'public')))



// const auth = () => async (req ,res, next)=>{
//     if(!req.cookies['sessionId']){
//         return next()
//     }
//     const user = await findSession(req.cookies['sessionId'])
//     req.user = user
//     req.sessionId = req.cookies['sessionId']
//     next()
// }

// app.get('/login', auth(), (req,res) =>{
//     console.log('login page')
//     staticFile(res , '/html/login.html', '.html')
//     // res.render('index', {
//     //     user: req.user,
//     //     authError: req.query.authError === 'true'
//     // })
// })

// app.post('/login', bodyParser.urlencoded({extended:false}), async (req,res)=>{
//     const {username , password} = req.body
//     const user = await findUsername(username)
//     if(!user || user.password !== password){
//         // return res.redirect('/?authError=true')
//         return staticFile(res , '/html/admin.html', '.html')

//     }
//     const sessionId = await createSession(user._id)
//     res.cookie('sessionId', sessionId, {httpOnly: true }).redirect('/login')
// })


// app.post('/api/loop', auth() , async (req ,res)=>{
//     if(!req.user){
//         return res.sendStatus(401)
//     }
//     const user = await findUsername(req.user.username)

//     user.books += 1
//     res.json({books: user.books})

// })


// app.get('/logout', auth(), async (req,res)=>{
//     if(!req.user){
//         return res.redirect('/')
//     }
//     await deletesession(req.sessionId)
//     res.clearCookie('sessionId').redirect('/')
// })




// app.listen(3500)
// const porte = process.env.PORT || 3500

// app.listen(port , ()=>{
//     console.log(`Порт октрыт http://localhost:${port}`)
    
// })





// app.get('/js/time.js' , function(req,res){
//     res.sendFile(path.join(__dirname + "/js/time.js"))
// })

// const app = express()

// const DB = {
//     users: [{ _id: nanoid(), username: 'admin', password: '220802', books: 0, }],
//     sessions:{}
// }

// const port = process.env.PORT || 3500

// const findUsername = async (username) =>
//     DB.users.find((u) => u.username === username)

// const findSession = async (sessionId) =>{
//     const userId = DB.sessions[sessionId]
//     if(!userId){
//         return
//     }
//     return DB.users.find((u)=> u._id === userId)
// }

// const createSession = async userId =>{
//     const sessionId = nanoid()
//     DB.sessions[sessionId] = userId
//     return sessionId
// }

// const deletesession = async (sessionId) =>{
//     delete DB.sessions[sessionId]
// }

// nunjucks.configure('views', {
//     autoescape: true,
//     express: app,
// })
// app.set("view engine", 'njk');

// app.use(cookieParser())

// app.use(express.static(path.join(__dirname , 'public')))


// const auth = () => async (req ,res, next)=>{
//     if(!req.cookies['sessionId']){
//         return next()
//     }
//     const user = await findSession(req.cookies['sessionId'])
//     req.user = user
//     req.sessionId = req.cookies['sessionId']
//     next()
// }

// app.get('/', auth(), (req,res) =>{
//     res.render('index', {
//         user: req.user,
//         authError: req.query.authError === 'true'
//     })
// })

// app.post('/login', bodyParser.urlencoded({extended:false}), async (req,res)=>{
//     const {username , password} = req.body
//     const user = await findUsername(username)
//     if(!user || user.password !== password){
//         return res.redirect('/?authError=true')
//     }
//     const sessionId = await createSession(user._id)
//     res.cookie('sessionId', sessionId, {httpOnly: true }).redirect('/')
// })


// app.post('/api/loop', auth() , async (req ,res)=>{
//     if(!req.user){
//         return res.sendStatus(401)
//     }
//     const user = await findUsername(req.user.username)

// })


// app.get('/logout', auth(), async (req,res)=>{
//     if(!req.user){
//         return res.redirect('/')
//     }
//     await deletesession(req.sessionId)
//     res.clearCookie('sessionId').redirect('/')
// })

// const app = express()

// const DB = {
//     users: [{ _id: nanoid(), username: 'admin', password: '220802', books: 0, }],
//     sessions:{}
// }

// const findUsername = async (username) =>
//     DB.users.find((u) => u.username === username)

// const findSession = async (sessionId) =>{
//     const userId = DB.sessions[sessionId]
//     if(!userId){
//         return
//     }
//     return DB.users.find((u)=> u._id === userId)
// }

// const createSession = async userId =>{
//     const sessionId = nanoid()
//     DB.sessions[sessionId] = userId
//     return sessionId
// }

// const deletesession = async (sessionId) =>{
//     delete DB.sessions[sessionId]
// }

// const mimeTypes = {
//     '.html': 'text/html',
//     '.js': 'text/javascript',
//     '.css': 'text/css'
// }

// function staticFile(res, filePath , ext){
//     res.setHeader('Content-Type', mimeTypes[ext])
//     fs.readFile('./public' + filePath , (error, data)=>{
//         if (error){
//             res.statusCode = 404
//             res.end()
//         }
//         res.end(data)
//     })
// }

// nunjucks.configure('views', {
//     autoescape: true,
//     express: app,
// })
// app.set("view engine", 'njk');

// app.use(cookieParser())

// const auth = () => async (req ,res, next)=>{
//     if(!req.cookies['sessionId']){
//         return next()
//     }
//     const user = await findSession(req.cookies['sessionId'])
//     req.user = user
//     req.sessionId = req.cookies['sessionId']
//     next()
// }

// app.get('/', (req,res) =>{
//     res.render('index', {

//     })
// })

// app.get('/admin', auth(), (req,res)=>{
//     res.render('admin' ,{
//         user: req.user,
//     })
// } )

// app.post('/login', bodyParser.urlencoded({extended:false}), async (req,res)=>{
//     const {username , password} = req.body
//     const user = await findUsername(username)
//     if(!user || user.password !== password){
//         return res.redirect('/?authError=true')
//     }
//     const sessionId = await createSession(user._id)
//     res.cookie('sessionId', sessionId, {httpOnly: true }).redirect('/admin')
// })

// app.get('/logout', auth(), async (req,res)=>{
//     if(!req.user){
//         return res.redirect('/')
//     }
//     await deletesession(req.sessionId)
//     res.clearCookie('sessionId').redirect('/')
// })

// const port = process.env.PORT || 3500
// app.listen(3500)





// const auth = () => async (req ,res, next)=>{
//    if (req.isAuthentticated()){
//     next()
//    }else{
//     return res.redirect('/')
//    }
// } 



// const DB = {
//     users: [{ _id: nanoid(), username: 'admin', password: '220802', books: 0, }],
//     sessions:{}
// }

// const port = process.env.PORT || 3500
// const mimeTypes = {
//     '.html': 'text/html',
//     '.js': 'text/javascript',
//     '.css': 'text/css'
// }

// function staticFile(res, filePath , ext){
//     res.setHeader('Content-Type', mimeTypes[ext])
//     fs.readFile('./public' + filePath , (error, data)=>{
//         if (error){
//             res.statusCode = 404
//             res.end()
//         }
//         res.end(data)
//     })
// }
// const findUsername = async (username) =>
//     DB.users.find((u) => u.username === username)

// const findSession = async (sessionId) =>{
//     const userId = DB.sessions[sessionId]
//     if(!userId){
//         return
//     }
//     return DB.users.find((u)=> u._id === userId)
// }

// const createSession = async userId =>{
//     const sessionId = nanoid()
//     DB.sessions[sessionId] = userId
//     return sessionId
// }

// const deletesession = async (sessionId) =>{
//     delete DB.sessions[sessionId]
// }

// const auth = () => async (req ,res, next)=>{
//     if(!req.cookies['sessionId']){
//         return next()
//     }
//     const user = await findSession(req.cookies['sessionId'])
//     req.user = user
//     req.sessionId = req.cookies['sessionId']
//     next()
// }

// app.get('/login', (req,res) => staticFile(res , '/html/login.html', '.html'))


// app.post('/login', bodyParser.urlencoded({extended:false}), async (req,res)=>{
//     const {username , password} = req.body
//     const user = await findUsername(username)
//     if(!user || user.password !== password){
//         return res.redirect('/admin')
//     }
//     const sessionId = await createSession(user._id)
//     res.cookie('sessionId', sessionId, {httpOnly: true }).redirect('/admin')
// })


// // app.post('/login', (req,res, next)=>{

// // })


// app.get('/admin', auth(), (req,res)=>{

//     staticFile(res , '/html/admin.html', '.html')

// })

// app.get('/logout', auth(), async (req,res)=>{
//     if(!req.user){
//         return res.redirect('/')
//     }
//     await deletesession(req.sessionId)
//     res.clearCookie('sessionId').redirect('/')
// })


exports.up = function(knex) {
    return knex.schema.createTable("users",(table)=>{
        table.increments("id")
        table.string("username" , 255).notNullable().unique()
        table.string("password" , 255).notNullable()
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable("users")
};


//   PORT = 5000
//   EMAIL = 'enginegarag1@yandex.ru'
//   PASS = 'zfgeamqbriihecbm'







// app.use(bodyParser.json())

// let users = [
//     {username: 'admin' , password: '12345'}
// ]

// const mimeTypes = {
//     '.html': 'text/html',
//     '.js': 'text/javascript',
//     '.css': 'text/css'
// }

// function staticFile(res, filePath , ext){
//     res.setHeader('Content-Type', mimeTypes[ext])
//     fs.readFile('./public' + filePath , (error, data)=>{
//         if (error){
//             res.statusCode = 404
//             res.end()
//         }
//         res.end(data)
//     })
// }

// app.use(session({
//     store: store,
//     resave: false,
//     saveUninitialized: true,
//     secret: 'super'
// }))

// app.get('/', function (req,res){
//     staticFile(res , '/html/login.html', '.html')
// })

// app.post('/login', function(req,res){

// let foundUser

// for(let i = 0 ; i < users.length; i++){
//     let u = users[i]
//     if (u.username == req.body.username && u.password == req.body.password){
//         foundUser = u.username
//         break
//     }
// }
// if (foundUser !== undefined){
//     req.session.username = foundUser
//     console.log('login')
//     res.send('admin hi')
// }else{
//     res.status(401).send('login error')
// }
// })

// app.get('/check', function(req,res){
//     if (req.session.username){
//         res.set('Content-Type', 'text/html')
//         res.send('<h2> user hi</h2>')
//     }else{
//         res.send('not logget')
//     }
// })