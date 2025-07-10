const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const { result } = require('lodash');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes')
// express app
const app = express();

//connect to mangoDB
const dbURI= 'mongodb+srv://Presza:Koliber123@nodecours.qonhalo.mongodb.net/node-cours?retryWrites=true&w=majority&appName=NodeCours'
mongoose.connect(dbURI)
  .then((result)=>app.listen(3000))
  .catch((err)=>console.log(err))
// listen for requests


// register view engine
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
//blog routes
app.use('/blogs',blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
