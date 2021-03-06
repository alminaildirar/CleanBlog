const express = require('express')
const mongoose =require('mongoose')
const methodOverride = require('method-override');
const ejs = require('ejs')
const path = require('path');
const Blog = require('./models/Blog.js')
const blogControllers = require('./controllers/blogControllers')
const pageControllers = require('./controllers/pageControllers.js')


const app = express()

//connection database
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true    
})



//Middlewares
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method', {
    methods:['POST','GET']
  }))


//Routers
app.get('/', blogControllers.getAllBlogs);
app.get('/blogs/:id', blogControllers.getBlog)
app.post('/blogs', blogControllers.createBlog)
app.put('/blogs/:id', blogControllers.updateBlog)
app.delete('/blogs/:id', blogControllers.deleteBlog)



app.get('/about', pageControllers.getAboutPage)
app.get('/add_post', pageControllers.getAddPage)

app.get('/blogs/edit/:id', pageControllers.getEditPage)


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda baslatildi.`)
})