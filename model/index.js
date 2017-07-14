let sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

let User = sequelize.define('user', {
	username: {
		type: Sequelize.STRING;
	},
	slackId: {
		type: Sequelize.STRING;
	}
});

let Channel = sequelize.define('channel', {
	channelName: {
		type: Sequelize.STRING;
	},
	channelId: {
		type: Sequelize.STRING;
	}
});

let Project = sequelize.define('project', {
	projectName: {
		type: Sequelize.STRING;
	},
	projectRepoUrl: {
		type: Sequelize.STRING;
	}
}

Project.hasMany(User, { as: 'Contributors' });
User.hasMany(Project, { as: 'Projects' });
Channel.hasMany(User, { as: 'Members' });
Channel.hasMany(Project, { as: 'Projects' });

