const express=require('express')
const path=require('path')
const hbs=require('hbs')

const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { resolve } = require('dns')

const app=express()
const port=process.env.PORT || 3000 //this is setting up port for heroku or default(3000) will run if its not available 

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')//finding the path to connect to html page in different folder
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

//Register path for partials
hbs.registerPartials(partialsPath)

//Setup static directory to run
app.use(express.static(publicDirectoryPath))//passing path 

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sai Sowjanya'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Padamati Sai Sowjanya'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Padamati Sai Sowjanya'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

//if requested path not found
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Padamati Sai Sowjanya',
        txt:'Help page not found'
    })
})

//if requested path not found
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Padamati Sai Sowjanya',
        txt:'Page not found'
    })
})

app.listen(port,()=>{
    console.log("Server is up and running "+port)
})