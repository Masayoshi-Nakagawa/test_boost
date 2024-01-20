const express = require('express');
const include = require('express-include-html');
const app = express();

app.use(include({ baseDir: __dirname }));
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});