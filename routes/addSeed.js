const router = require('express').Router();
const config = require('../db/connections');
const knex = require('knex')(config.development);

router.route('/')
      .get(getSeeds)
      .post(addSeeds);

router.route('/:id')
      .put(updateSeeds)
      .delete(deleteSeed);

function getSeeds(req, res) {

  knex.select()
      .from('seeds')
      .then(function (response) {
        console.log('response', response);
        res.send(response);
      }).catch(function (err) {
        console.log('Error Querying the DB', err);
        res.sendStatus(500);
      });
};

function addSeeds(req, res) {

};

function updateSeeds(req, res) {

}

function deleteSeed(req, res) {

};

module.exports = router;
