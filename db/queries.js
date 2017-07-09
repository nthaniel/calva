const pgp = require('pg-promise')();
const connectionString = 'postgres://localhost:5432/calva';
const db = pgp(connectionString);

// add query functions
function getArtObjects(req, res, next) {
  db.any(`SELECT thumbnail1, title, medium, a.name AS artist, subject, art_type FROM art_objects AS ao INNER JOIN artists as a on (ao.artist_id = a.id) ORDER BY title LIMIT 10 OFFSET ${req.body.offset || 0}`)
    .then(function (data) {
      res.status(200)
        .json({
          data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getArtObjects,
//   getSinglePuppy: getSinglePuppy,
//   createPuppy: createPuppy,
//   updatePuppy: updatePuppy,
//   removePuppy: removePuppy
};
