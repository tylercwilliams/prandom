let Sequelize = require('sequelize');
let sequelize = new Sequelize('postgres://localhost/prandom');

let User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  slackId: {
    type: Sequelize.STRING,
  },
});

User.findUser = function findUser(slackUserEscape) {
  let tokens = slackUserEscape.replace('<','').replace('>', '').split('|');

  return User.findOne({where: {username: tokens[0]}});
};

User.createUser = function createUser(slackUserEscape) {
  let tokens = slackUserEscape.replace('<','').replace('>', '').split('|');

  return User.create({
    username: tokens[0],
    slackId: tokens[1],
  });
};

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

Project.belongsToMany(User, { through: 'UserProject' });
User.belongsToMany(Project, { through: 'UserProject' });
Channel.hasMany(User, { as: 'Members' });
Channel.belongsToMany(Project, { through: 'MemberProject' });

module.exports =  {
  User: User,
  Project: Project,
  Channel: Channel,
  sequelize: sequelize,
};
