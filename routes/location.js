const router = require('express').Router();
const config = require('../db/connections');
const knex = require('knex')(config.development);

router.route('/')
      .get(getLocations)
      .post(addLocation);

router.route('/:id')
      .put(updateLocation)
      .delete(deleteLocation);

function getLocations(req, res) {

  knex.select()
      .from('location')
      .then(function (locations) {
        console.log('locations', locations);
        res.send(locations);
      }).catch(function (err) {
        console.log('Error Querying the DB', err);
        res.sendStatus(500);
      });
};

function addLocation(req, res) {

  var newLocation = {
    field: req.body.field,
    section: req.body.section,
    row: req.body.row,
  };

  knex.insert(newLocation)
      .into('location')
      .returning('*')
      .then(function (location) {
        console.log('location', location);
        res.sendStatus(200);
      }).catch(function (err) {
        console.log('Error Querying the DB', err);
      });
};


function updateLocation(req, res) {
  console.log('req.body', req.body);

  console.log("req.params", req.params);
  var locationID = req.params.id;
  var updatedLocation = {
    field: req.body.field,
    section: req.body.section,
    row: req.body.row,
  };

  knex('location').where('id', locationID)
                  .update(updatedLocation)
                  .then(function (response) {
                    res.sendStatus(200);
                  }).catch(function (err) {
                    console.log('Error Querying the DB', err);
                  });
};

function deleteLocation(req, res) {
  var locationID = req.params.id;

  knex('location').where('id', locationID)
                  .delete()
                  .then(function (response) {
                    res.sendStatus(204);
                  }).catch(function (err) {
                    console.log('Error Querying the DB', err);
                  });
};

module.exports = router;
