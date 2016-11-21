const router = require('express').Router();
const config = require('../db/connections');
const knex = require('knex')(config.development);

router.route('/')
      .get(getUsedSeeds)
      .post(addUsedSeed);

router.route('/:id')
      .put(updateUsedSeed)
      .delete(deleteUsedSeed);

// get currently in use seeds in DB
function getUsedSeeds(req, res) {

  knex.select()
      .from('seedsinuse')
      .then(function (response) {
        console.log('response', response);
        res.send(response);
      }).catch(function (err) {
        console.log('Error Querying the DB', err);
        res.sendStatus(500);
      });
};

// add seed in use to DB and set location
function addUsedSeed(req, res) {
console.log('req body', req.body);
  var seedsInUseObject = {
    seeds_id: req.body.seedsId,
    transfer: req.body.transfer,
    quantity: req.body.quantity
  };

  var seedLocation = {
    field: req.body.field,
    section: req.body.section,
    row: req.body.row
  };

  // insert seed in use in seedinuse table
  knex.insert(seedsInUseObject)
      .into('seedsinuse')
      .returning('*')
      .then(function (result) {
        seedLocation.seedsinuse_id = result.rows[0].id;
        console.log('seedLocation', seedLocation);

        // insert used seed location in location table
        knex.insert(seedLocation)
            .into('location')
            .returning('*')
            .then(function (location) {
              console.log('location', location);
            }).catch(function (err) {
              console.log('Error Querying the DB', err);
            });

        res.sendStatus(200);
      }).catch(function (err) {
        console.log('Error Querying the DB', err);
      });
};

function updateUsedSeed(req, res) {
  var id = req.params.id;

  var seedsInUseObject = {
    seeds_id: req.body.seedsId,
    transfer: req.body.transfer,
    quantity: req.body.quantity
  };

  var seedLocation = {
    field: req.body.field,
    section: req.body.section,
    row: req.body.row
  };

  knex('seedsinuse').where('id', id)
               .update(seedsInUseObject)
               .returning('*')
               .then(function (result) {
                  // seedLocation.seedsinuse_id = result.rows[0].id;
                  seedLocation.seedsinuse_id = id;
                  console.log('seedLocation', seedLocation);

                  // insert used seed location in location table
                  knex('location').where('seedsinuse_id', seedLocation.seedsinuse_id)
                     .update(seedLocation)
                     .returning('*')
                     .then(function (location) {
                        console.log('location', location);
                      }).catch(function (err) {
                        console.log('Error Querying the DB', err);
                      });

                  res.sendStatus(200);
                }).catch(function (err) {
                  console.log('Error Querying the DB', err);
                });
};

function deleteUsedSeed(req, res) {
  var id = req.params.id;

  // delete seed in use
  knex('seedsinuse').where('id', id)
               .delete()
               .then(function (response) {

                  // delete planted location
                  knex('location').where('seedsinuse_id', id)
                                 .delete()
                                 .then(function (response) {
                                    console.log('deleted');
                                  }).catch(function (err) {
                                    console.log('Error Querying the DB', err);
                                  });

                  res.sendStatus(204);
                }).catch(function (err) {
                  console.log('Error Querying the DB', err);
                });
};

module.exports = router;
