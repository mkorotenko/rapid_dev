// Allowed extensions list can be extended depending on your own needs
const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 3000;

//app.get('/api', (req, res) => res.json({ application: 'Reibo collection' }));
const routes = require('./routes'); //importing route
routes(app); //register the route

app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`dist/${req.url}`));
    } else {
        res.sendFile(path.resolve('dist/index.html'));
    }
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(bodyParser.text({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.listen(port, () => console.log(`http is started ${port}`));

// Catch errors
app.on('error', (error) => {
    console.error(new Date(), 'ERROR', error);
});

