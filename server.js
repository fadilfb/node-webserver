const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next) => {
   const now = new Date().toString();
   const log = `${now}: ${req.method} ${req.url}`;

   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) => {
      if (err) {
         console.log('Unable to append to server.log');
      }
   });
   next();
});

// app.use((req, res, next) => {
//    res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});

app.get('/', (req, res) => {
   // res.send('Halo Fadil');
   res.render('home.hbs', {
      pageTitle: 'Fadil Home Page',
      welcomeMessage: 'Welcome my friend...'
   })
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
      pageTitle: 'About Page Lombok'
   });
});

app.get('/bad', (req, res) => {
   res.send({
      errorMessage: 'Unable to handel request'
   });
});

app.listen(port, function() {
   console.log(`App listening on port ${port}!`);
});

