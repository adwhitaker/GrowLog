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
  // var type = req.query.type;

  knex.select('type', 'assigndate', 'completedate', 'duration', 'amount', 'weedtype',
      'title', 'comments', 'act_loc_users.id', 'act_id', 'location_id', 'users_id', 'field',
      'section', 'row')
      .from('activities')
      .join('act_loc_users', 'act_loc_users.act_id', 'activities.id')
      .join('location', 'act_loc_users.location_id', 'location.id')
      // .where('type', type)
      .then(function (activities) {
        console.log('activites returned from DB', activities);
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
      location_id: req.body.location_id
    }
  };

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
  var updateActivity = {
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
      users_id: req.body.users_id,
      location_id: req.body.location_id,
      act_id: req.params.id
    },
    joins_id: req.body.joins_id
  };

  knex('activities').where('id', updateActivity.ids.act_id)
                  .update(updateActivity.activity)
                  .then(function (response) {
                    return updateActivity;
                  })
                  .then(joinsTablesRoute.joinsTable.updateActivityLocationUserTable)
                  .then(function (result) {
                    res.sendStatus(200);
                  })
                  .catch(function (err) {
                    console.log('Error Querying the DB', err);
                  });
};

function deleteActivity(req, res) {
  var activityID = req.params.id;
  var joinsID = req.query.joinsID;

  knex('activities').where('id', activityID)
                  .delete()
                  .then(function (result) {
                    return joinsID;
                  })
                  .then(joinsTablesRoute.joinsTable.deleteActivityLocationUserTable)
                  .then(function (result) {
                    res.sendStatus(204);
                  })
                  .catch(function (err) {
                    console.log('Error Querying the DB', err);
                  });
};

router.activitiesFunctions = {
  getActivities
};

module.exports = router;
