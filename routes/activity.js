const router = require('express').Router();
const config = require('../db/connections');
const knex = require('knex')(config.development);
const joinsTablesRoute = require('./joinsTables');

router.route('/')
      .get(getActivities)
      .post(addActivity);

router.route('/:id')
      .put(updateActivity)
      .delete(deleteActivity);

function getActivities(req, res) {

  knex.select()
      .from('activities')
      .then(function (activities) {
        console.log('activities', activities);
        res.send(activities);
      }).catch(function (err) {
        console.log('Error Querying the DB', err);
        res.sendStatus(500);
      });
};

function addActivity(req, res) {

  var newActivity = {
    activity: {
      type: req.body.type,
      assigndate: req.body.assigndate,
      completedate: req.body.completedate,
      duration: req.body.duration,
      amount: req.body.amount,
      weedtype: req.body.weedtype,
      title: req.body.title,
      comments: req.body.comments
    },
    ids: {
      users_id: req.user.id,
      location_id: 3
      // location_id: req.body.location_id
    }
  };

  console.log('new activity', newActivity);
  knex.insert(newActivity.activity)
      .into('activities')
      .returning('*')
      .then(function (result) {
        newActivity.ids.act_id = result[0].id;
        return newActivity;
      })
      .then(joinsTablesRoute.joinsTable.addActivityLocationUserTable)
      .then(function (result) {
        res.sendStatus(200);
      })
        .catch(function (err) {
        console.log('Error Querying the DB', err);
      });
};

function updateActivity(req, res) {
  var activityID = req.params.id;
  var userId = req.user.id;

  var updateActivity = {
    type: req.body.type,
    assigndate: req.body.assigndate,
    completedate: req.body.completedate,
    duration: req.body.duration,
    amount: req.body.amount,
    weedtype: req.body.weedtype,
    title: req.body.title,
    comments: req.body.comments
  };

  knex('activity').where('id', activityID)
                  .update(updateActivity)
                  .then(function (response) {
                    res.sendStatus(200);
                  }).catch(function (err) {
                    console.log('Error Querying the DB', err);
                  });
};

function deleteActivity(req, res) {
  var activityID = req.params.id;

  knex('activity').where('id', activityID)
                  .delete()
                  .then(function (response) {
                    res.sendStatus(204);
                  }).catch(function (err) {
                    console.log('Error Querying the DB', err);
                  });
};

module.exports = router;
