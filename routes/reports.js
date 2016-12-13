const router = require('express').Router();
const config = require('../db/connections');
const knex = require('knex')(config.development);
const joinsTablesRoute = require('./joinsTables');
const seeds = require('./addSeed');

router.route('/')
      .get(getReport);

function getReport(req, res) {
  knex.select('field', 'section', 'row', 'type', 'assigndate', 'completedate', 'duration', 'amount', 'weedtype', 'title', 'comments', 'google_name', 'transfer', 'usedquantity', 'plantedassigndate', 'plantduration', 'projectedharvestdate', 'actualharvestdate', 'amountharvested', 'amountharvestedunits', 'harvestduration', 'generic', 'variety', 'family', 'orderdate', 'quantity', 'unitsperpack', 'quantityunits', 'seedsperunit', 'manufacturer', 'supplier', 'daystoharvest', 'receivedate', 'lotnumber', 'donation', 'plantouse')
      .from('location')
      .join('act_loc_users', 'location.id', 'act_loc_users.location_id')
      .join('activities', 'act_loc_users.act_id', 'activities.id')
      .join('users', 'act_loc_users.users_id', 'users.id')
      .join('seeds_in_use_loc', 'location.id', 'seeds_in_use_loc.location_id')
      .join('seedsinuse', 'seeds_in_use_loc.seedsinuse_id', 'seedsinuse.id')
      .join('seeds', 'seedsinuse.seeds_id', 'seeds.id')
      .then(function (response) {
        console.log('response', response);
        res.send(response);
      }).catch(function (err) {
        console.log('Error Querying the DB', err);
        res.sendStatus(500);
      });
}

module.exports = router;
