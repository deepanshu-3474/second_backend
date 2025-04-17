// import './server.js'

///console.log(s(10,20))

// const {display} = require('./server')

// r.display();
// r.dd()

//  display();
import http from 'http';
// import dotenv from 'dotenv';
// dotenv.config()
import 'dotenv/config'
import fs from 'fs'
import app from './app.js'
const server = http.createServer(app);
server.listen(process.env.PORT,function(){
    console.warn(`server started http://localhost:${process.env.PORT}`)
})


