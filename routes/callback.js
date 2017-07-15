let express = require('express');
let router = express.Router();
let db = require('../model');

let User = db.User;
let Project = db.Project;
let Channel = db.Channel;

router.post('/', (req, res, next) => {
  let text = req.body.text;
  let tokens = text.split(' ');

  let command = tokens[0];
  let username = tokens[1];
  let projectName = tokens[3];

  let userRe = /<@[a-zA-Z0-9]+\|[0-9a-zA-Z_-]+>/g;
  let channelRe = /<#[a-zA-Z0-9]+\|[0-9a-zA-Z_-]+>/g;

  console.log('Command: ' + command);
  console.log('Username: ' + username);

  // Error state for malformed command.
  if (!username.match(userRe)) {
    return res.status(404).send('username match err');
  }

  if (command == 'add') {
    return Promise.all(
      Project.findProject(projectName),
      User.findOrCreate(username)
    )
     .then((project, user) => {
      if (!project) {
        return res.status(200).send({
          response_type: 'ephemeral',
          text: 'No project found with that name',
        });
      }
      return res.status(200).send({
        response_type: 'ephemeral',
        text: user,
      });
    })
    .catch(next);
  }
});

module.exports = router;
