const router = require('express').Router();
const config = require('../db/connections');
const knex = require('knex')(config.development);

router.route('/')
      .get(getSeeds)
      .post(addSeed);

router.route('/:id')
      .put(updateSeed)
      .delete(deleteSeed);

// get all seeds from the DB
function getSeeds(req, res) {

  knex.select()
      .from('seeds')
      .orderBy('id')
      .then(function (response) {
        console.log('response', response);
        res.send(response);
      }).catch(function (err) {
        console.log('Error Querying the DB', err);
        res.sendStatus(500);
      });
};

// add new seed to the DB
function addSeed(req, res) {
  // object containing new seed information
  var newSeed = {
    generic: req.body.generic,
    variety: req.body.variety,
    family: req.body.family,
    orderdate: req.body.orderdate,
    quantity: req.body.quantity,
    unitsperpack: req.body.unitsperpack,
    quantityunits: req.body.quantityunits,
    seedsperunit: req.body.seedsperunit,
    manufacturer: req.body.manufacturer,
    supplier: req.body.supplier,
    daystoharvest: req.body.daystoharvest,
    receivedate: req.body.receivedate,
    lotnumber: req.body.lotnumber,
    donation: req.body.donation,
    plantouse: req.body.plantouse
  };

  knex.insert(newSeed)
      .into('seeds')
      .returning('*')
      .then(function (seed) {
        console.log('new seed added:', seed);
        res.sendStatus(200);
      }).catch(function (err) {
        console.log('Error Querying the DB', err);
      });
};

// update seed in the DB
function updateSeed(req, res) {
  var seedID = req.params.id;

  // object containing seed information to update
  var updateSeed = {
    generic: req.body.generic,
    variety: req.body.variety,
    family: req.body.family,
    orderdate: req.body.orderdate,
    quantity: req.body.quantity,
    unitsperpack: req.body.unitsperpack,
    quantityunits: req.body.quantityunits,
    seedsperunit: req.body.seedsperunit,
    manufacturer: req.body.manufacturer,
    supplier: req.body.supplier,
    daystoharvest: req.body.daystoharvest,
    receivedate: req.body.receivedate,
    lotnumber: req.body.lotnumber,
    donation: req.body.donation,
    plantouse: req.body.plantouse
  };

  knex('seeds').where('id', seedID)
               .update(updateSeed)
               .then(function (response) {
                  res.sendStatus(200);
                }).catch(function (err) {
                  console.log('Error Querying the DB', err);
                });
};

// delete seed from DB
function deleteSeed(req, res) {
  let id = req.params.id;

  knex('seeds').where('id', id)
               .delete()
               .then(function (response) {
                  res.sendStatus(204);
                }).catch(function (err) {
                  console.log('Error Querying the DB', err);
                  res.sendStatus(500);
                });
};

router.seedsFunctions = {
  getSeeds
};

module.exports = router;
