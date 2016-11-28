const router = require('express').Router();
const config = require('../db/connections');
const knex = require('knex')(config.development);

// add seed location and seed in use to seed_in_use_loc joins table
function seedLocationJoinTable(newUsedSeed) {

  var newSeedLocation = {
    seedsinuse_id: newUsedSeed.seed.id,
    location_id: newUsedSeed.location_id,
  };

  return knex.insert(newSeedLocation)
             .into('seeds_in_use_loc')
             .returning('*')
             .then(function (result) {
                return;
              });
};

// update seed location and seed in use to seed_in_use_loc joins table
function updateSeedLocationJoinTable(updateUsedSeed) {

  var joinID = updateUsedSeed.join_id;
  var updateLocationSeed = {
    seedsinuse_id: updateUsedSeed.seedsinuse_id,
    location_id: updateUsedSeed.location_id,
  };

  return knex('seeds_in_use_loc').where('id', joinID)
                                 .update(updateLocationSeed)
                                 .then(function (result) {
                                    return;
                                  });
};

// delete seed location and seed in use to seed_in_use_loc joins table
function deleteSeedLocationJoinTable(deleteSeed) {
  var joinID = deleteSeed.join_id;

  return knex('seeds_in_use_loc').where('id', joinID)
                                 .delete()
                                 .then(function (result) {
                                    return;
                                  });
};

// add activity, location, and user to act_loc_users joins table
function addActivityLocationUserTable(newActivity) {

  return knex.insert(newActivity.ids)
             .into('act_loc_users')
             .returning('*')
             .then(function (result) {
                return;
              });
};

// update activity, location, and user to act_loc_users joins table
function updateActivityLocationUserTable(updateActivity) {

  return knex('act_loc_users').where('id', updateActivity.joins_id)
                              .update(updateActivity.ids)
                              .then(function (result) {
                                return;
                              });
};

// delete activity, location, and user to act_loc_users joins table
function deleteActivityLocationUserTable(joinsID) {
  return knex('act_loc_users').where('id', joinsID)
                              .delete()
                              .then(function (result) {
                                return;
                              });
};

router.joinsTable = {
  seedLocationJoinTable,
  updateSeedLocationJoinTable,
  deleteSeedLocationJoinTable,
  addActivityLocationUserTable,
  updateActivityLocationUserTable,
  deleteActivityLocationUserTable
};

module.exports = router;
