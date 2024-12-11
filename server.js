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
// import mysql from 'mysql'
// import session from 'express-session'
require('dotenv').config()
const fs = require('fs')
const url = require('url')
const path = require('path')
const nodemailer = require('nodemailer')
const cors = require('cors')
const {body , validationResult, Result} = require('express-validator')
const express = require('express')
const {nanoid} = require('nanoid')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')







const app = express()
const port = process.env.PORT || 5000
app.use(express.static('public'))

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// let connection = mysql.createConnection({
//     host:  process.env.HOST,
//     port: process.env.PORT || 5432,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
// })




//начало админ 
const knex = require('knex')({
    client:"mysql",
    connection:{
    host:  process.env.HOST,
    port: process.env.PORT || 3306,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    },
})

const findUsername = async (username) =>
   knex('users')
.select()
.where({ username })
.limit(1)
.then((results)=> results[0])

const findSession = async (sessionId) =>{
const session = await knex('sessions')
.select('user_id')
.where({session_id: sessionId})
.limit(1)
.then((results)=> results[0] )

if (!session){
    return
}
return knex('users')
.select()
.where({id: session.user_id})
.limit(1)
.then((results) => results[0] )

}

const createSession = async userId =>{
    const sessionId = nanoid()
  await knex('sessions').insert({
    user_id: userId,
    session_id: sessionId
  })
    return sessionId
}

const deletesession = async (sessionId) =>{
    await knex('sessions')
    .where({session_id: sessionId})
    .delete()
}

nunjucks.configure('views', {
    autoescape: true,
    express: app,
})
app.set("view engine", 'njk');

app.use(cookieParser())

const auth = () => async (req ,res, next)=>{
    if(!req.cookies['sessionId']){
        return next()
    }
    const user = await findSession(req.cookies['sessionId'])
    req.user = user
    req.sessionId = req.cookies['sessionId']
    next()
}

app.get('/garag', (req,res) =>{
    res.render('index', {
        
 authError: req.query.authError === 'true',
    })
})

app.get('/admin', auth(), (req,res)=>{
    res.render('admin' ,{
        user: req.user,
       
    })
} )

app.post('/login', bodyParser.urlencoded({extended:false}), async (req,res)=>{
    const {username , password} = req.body
    const user = await findUsername(username)
    if(!user || user.password !== password){
        return res.redirect('/?authError=true')
    }
    const sessionId = await createSession(user.id)
    res.cookie('sessionId', sessionId, {httpOnly: true }).redirect('/admin')
})


app.get('/logout', auth(), async (req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    await deletesession(req.sessionId)
    res.clearCookie('sessionId').redirect('/')
})
//конец админ


//начало email
app.use(express.json())
app.use(cors())

const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

const transporterу = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

function trimReplace(value){
    if (typeof value === 'string'){
        return value.trim().replace(/\s+/g, '')
    }
    return value
}

const validateData = [
body('nam').customSanitizer(trimReplace).notEmpty().withMessage('Нет ФИО')
.isLength({min: 5 , max: 50}).withMessage('ФИО должно быть 5-50 символов'),
]

app.post('/send-email', validateData , async (req,res)=>{

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        }
        const { nam , phone , modeli , yeare , vw , moshe , VINe , cit , type , typet , engine } = req.body

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `Заявка от ${nam}`,
            html:
             ` 
            <p><strong>Телефон:</strong>${phone}</p>
            <p><strong>Запчасть:</strong>${engine}</p>
            <p><strong>Марка или модель:</strong>${modeli}</p>
            <p><strong>Год выпуска:</strong>${yeare}</p>
            <p><strong>Обьем:</strong>${vw}</p>
            <p><strong>Мощность:</strong>${moshe}</p>
            <p><strong>VIN:</strong>${VINe}</p>
            <p><strong>Город:</strong>${cit}</p>
            <p><strong>Тип КПП:</strong>${type}</p>
            <p><strong>Тип топлива:</strong>${typet}</p>
            `
        })
        res.send('Отправлено!')

    }catch(error){
        console.error(error)
        res.status(500).send(error.message)
    }
   
})

app.post('/send-email-form', async (req,res)=>{
    
        const { qw1 ,qw2,qw3,qw4,qw5,qw6, nameForm , phoneForm } = req.body

        await transporterу.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `Заявка от ${nameForm}`,
            html:
             ` 
            <p><strong>Имя:</strong>${nameForm}</p>
            <p><strong>Телефон:</strong>${phoneForm}</p>
            <p><strong>Какую автозапчасть ищете?:</strong>${qw1}</p>
            <p><strong>У вас есть опыт в приобретении контрактных запчастей?:</strong>${qw2}</p>
            <p><strong>Для кого ищете запчасть?:</strong>${qw3}</p>
            <p><strong>Вам интересна услуга “под ключ” продажа + установка запчасти?:</strong>${qw4}</p>
            <p><strong>Если ваша запчасть будет «под заказ» сколько вы сможете ждать поставку?:</strong>${qw5}</p>
            <p><strong>Что для вас в приоритете?:</strong>${qw6}</p>
            `
        })
        res.send('Отправлено!')

    
})
//конец email
app.listen(port ,(err)=>{
    if(err){
        return console.log(err)
    }
    console.log(`Сервер запущен на порту ${port}`)
})