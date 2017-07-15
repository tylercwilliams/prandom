let Sequelize = require('sequelize');
let sequelize = new Sequelize('postgres://localhost:5000/prandom');

let User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  slackId: {
    type: Sequelize.STRING,
  },
});

let Channel = sequelize.define('channel', {
  channelName: {
    type: Sequelize.STRING,
  },
  channelId: {
    type: Sequelize.STRING,
  },
});

let Project = sequelize.define('project', {
  projectName: {
    type: Sequelize.STRING,
  },
  projectRepoUrl: {
    type: Sequelize.STRING,
  },
});

Project.hasMany(User, { as: 'Contributors' });
User.hasMany(Project, { as: 'Projects' });
Channel.hasMany(User, { as: 'Members' });
Channel.hasMany(Project, { as: 'Projects' });

module.exports =  {
  User: User,
  Project: Project,
  Channel: Channel,
};
