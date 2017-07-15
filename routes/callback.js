let express = require('express');
let router = express.Router();
let db = require('../model');

let User = db.User;
let Project = db.Project;
let Channel = db.Channel;

router.post('/', (req, res, next) => {
  let text = req.body.text;
  let tokens = text.split(' ');

  // TODO:  validate these in a meaningful way
  let command = tokens[0];

  let userRe = /<@[a-zA-Z0-9]+\|[0-9a-zA-Z_-]+>/g;
  let channelRe = /<#[a-zA-Z0-9]+\|[0-9a-zA-Z_-]+>/g;

  if (command == 'add') {
    let username = tokens[1];
    let projectName = tokens[3];

    return Promise.all([
      Project.findProject(projectName),
      User.findOrCreate(username),
    ])
     .then(results => {
      [project, user] = results;
      console.log('Callback User: ' + user);
      if (project === null) { return user; }
      return user.addProject(project);
    })
    .then(user => {
      return res.send({
        response_type: 'ephemeral',
        text: user,
      });
    })
    .catch(next);
  }

  if (command == 'register') {
    let projectName = tokens[1];
    let projectRepo = tokens[3];

    return Project.findProject(projectName)
      .then(project => {
        if (project === null) {
          return Project.createProject(projectName, projectRepo);
        }
      })
    .then(project => {
      return res.status(200).send(project);
    });
  }

  return res.status(200).send({
    response_type: 'ephemeral',
    text: command + ' is not a valid command',
  });

});

module.exports = router;
