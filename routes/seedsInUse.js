const router = require('express').Router();
const config = require('../db/connections');
const knex = require('knex')(config.development);
const locationRoute = require('./location');

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
      .join('seeds_in_use_loc', 'seedsinuse.id', 'seeds_in_use_loc.seedsinuse_id')
      .join('location', 'seeds_in_use_loc.location_id', 'location.id')
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

  // object containing seed info and location info
  var newUsedSeed = {
    seed: {
      seeds_id: req.body.seedsId,
      transfer: req.body.transfer,
      quantity: req.body.quantity
    },
    location_id: req.body.location_id
  };

  // insert seed in use info in the db // return id number
  knex.insert(newUsedSeed.seed)
      .into('seedsinuse')
      .returning('*')
      .then(function (result) {
        newUsedSeed.seed.id = result[0].id;
        return newUsedSeed;
      })
      .then(locationRoute.joinsTable.seedLocationJoinTable)
      .then(function (result) {
        res.sendStatus(200);
      })
      .catch(function (err) {
        console.log('Error Querying the DB', err);
      });

};

function updateUsedSeed(req, res) {
  var id = req.params.id;

  var updateUsedSeed = {
    seed: {
      id: req.body.id,
      seeds_id: req.body.seedsId,
      transfer: req.body.transfer,
      quantity: req.body.quantity
    },
    location_id: req.body.location_id,
    join_id: req.body.join_id
  };

  knex('seedsinuse').where('id', id)
                    .update(updateUsedSeed)
                    .returning('*')
                    .then(function (result) {
                      return updateUsedSeed;
                    })
                    .then(locationRoute.joinsTable.updateSeedLocationJoinTable)
                    .then(function (result) {
                      res.sendStatus(200);
                    })
                    .catch(function (err) {
                      console.log('Error Querying the DB', err);
                    });
};

function deleteUsedSeed(req, res) {
  var id = req.params.id;

  var deleteSeed = {
    location_id: req.body.location_id,
    join_id: req.body.join_id
  };

  // delete seed in use
  knex('seedsinuse').where('id', id)
               .delete()
               .then(function () {
                  return deleteSeed;
                })
                .then(locationRoute.joinsTable.deleteSeedLocationJoinTable)
                .then(function (result) {
                  res.sendStatus(204);
                })
                .catch(function (err) {
                  console.log('Error Querying the DB', err);
                });
};

module.exports = router;
