const express=require('express')
const {PORT}=require('./config/serverConfig')
const bodyparser=require('body-parser')
const apiRoutes=require('./routes/index')

const flightauthstart=()=>{
    const app=express()
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended:true}))
    app.use('/api',apiRoutes)
    app.listen(PORT,()=>{
        console.log(`Server is running on PORT ${PORT}`)
    })
}

flightauthstart();