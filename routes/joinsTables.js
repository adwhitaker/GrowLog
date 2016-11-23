const router = require('express').Router();
const config = require('../db/connections');
const knex = require('knex')(config.development);

function addActivityLocationUserTable(newActivity) {

  console.log('newActivity.id', newActivity.ids);
  return knex.insert(newActivity.ids)
             .into('act_loc_users')
             .returning('*')
             .then(function (result) {
                return;
              });
};

router.joinsTable = {
  addActivityLocationUserTable,

};

module.exports = router;
