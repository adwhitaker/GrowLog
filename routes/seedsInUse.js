const router = require('express').Router();
const config = require('../db/connections');
const knex = require('knex')(config.development);

router.route('/')
      .get(getUsedSeeds)
      .post(addUsedSeed);

router.route('/:id')
      .put(updateUsedSeed)
      .delete(deleteUsedSeed);

function getUsedSeeds(req, res) {

};

function addUsedSeed(req, res) {

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

  // knex insert seeds in use

  //response insert seed location
  seedLocation.seedsinuse_id = result.rows[0].id;
  // knex insert seed location
  seedLocation
  // catch
};

function updateUsedSeed(req, res) {

};

function deleteUsedSeed(req, res) {

};

module.exports = router;
