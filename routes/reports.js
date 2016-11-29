const router = require('express').Router();
const config = require('../db/connections');
const knex = require('knex')(config.development);
const joinsTablesRoute = require('./joinsTables');
const seeds = require('./addSeed');

router.route('/')
      .get(getReport);

function getReport(req, res) {
  // seeds.getSeeds().then(function(response) {
  //   return response;
  // });
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
}

module.exports = router;
