let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
	

});

router.post('/', (req, res, next) => {
	let text = res.body.text;
	let tokens = text.split(" ");
	
	let username = tokens[0];
	let command = tokens[1];
	let channelName = tokens[3];
	
	let userRe = /<@[a-zA-Z0-9]+\|[0-9a-zA-Z_-]+>/g;
	let channelRe = /<@[a-zA-Z0-9]+\|[0-9a-zA-Z_-]+>/g;

	// error state for malformed command.
	if (!username.matches(escapedRe)) {

	};

	if (!(channelName != "add") || (channelName != "remove")) {

	};

	if (!channelName.matches(escapedRe)) {

	};

	if (command == 'add' && type == 'user') {
		res.status(200).send({
			response_type: 'ephemeral',
				text: 'add user'
		});
		addUser();
	}

	if (command == 'add' && type == 'project') {
		res.status(200).send({
			response_type: 'ephemeral',
				text: 'add user'
		});
		addProject();
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
