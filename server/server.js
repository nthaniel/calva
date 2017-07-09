const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = require('../db/queries');


app.get('/api/art_objects', db.getArtObjects);
// router.get('/api/puppies/:id', db.getSinglePuppy);
// router.post('/api/puppies', db.createPuppy);
// router.put('/api/puppies/:id', db.updatePuppy);
// router.delete('/api/puppies/:id', db.removePuppy);


app.listen(1337, () => console.log('listening on port 1337!'));

module.exports = app;
