const router = require('express').Router();
const config = require('../db/connections');
const knex = require('knex')(config.development);

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
  var activityID = req.params.id;
  var userID = req.user.id;

  var newActivity = {
    type: req.body.type,
    assigndate: req.body.assigndate,
    completedate: req.body.completedate,
    duration: req.body.duration,
    amount: req.body.amount,
    weedtype: req.body.weedtype,
    title: req.body.title,
    comments: req.body.comments
  };

  knex.insert(newActivity)
      .into('activities')
      .returning('*')
      .then(function (activity) {
        console.log('activity', activity);
        res.sendStatus(200);
      }).catch(function (err) {
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
