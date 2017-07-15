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
  let username  = tokens[1];
  let channelName = tokens[3];
  let type = 'user';

  let userRe = /<@[a-zA-Z0-9]+\|[0-9a-zA-Z_-]+>/g;
  let channelRe = /<#[a-zA-Z0-9]+\|[0-9a-zA-Z_-]+>/g;

  console.log('Command: ' + command);
  console.log('Username: ' + username);
  console.log('Channel name: ' + channelName);
  console.log('Type: ' + type);

  // Error state for malformed command.
  if (!username.match(userRe)) {
    res.status(404).send('username match err');
    return;
  }

  if ((channelName == 'add') || (channelName == 'remove')) {
    res.status(404).send('add remove err');
    return;
  }

  if (!channelName.match(channelRe)) {
    res.status(404).send('channel name err');
    return;
  }

  if (command == 'add' && type == 'user') {
    res.status(200).send({
      response_type: 'ephemeral',
      text: 'add user',
    });
    addUser();
    return;
  }

  if (command == 'add' && type == 'project') {
    res.status(200).send({
      response_type: 'ephemeral',
      text: 'add user',
    });
    addProject();
    return;
  }

});

function addUser() {

}

function addProject() {

}

function removeUser() {

}

function removeProject() {

}

module.exports = router;
