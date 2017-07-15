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

User.findOrCreate = function findOrCreate(escapedUser) {
  return User.findUser(escapedUser)
    .then(user => {
      if (user) { return user; }
      return User.createUser(escapedUser);
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

let UserProjects = sequelize.define('userProjects', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

Project.findProject = function findProject(projectName) {
  return Project.findOne({where: {projectName: projectName}});
};

Project.createProject = function createProject(projectName, url) {
  return Project.create({
    projectName: projectName,
    proejectReportUrl: url,
  });
};

Project.belongsToMany(User, { through: UserProjects });
User.belongsToMany(Project, { through: UserProjects });
Channel.hasMany(User, { as: 'Members' });
Channel.belongsToMany(Project, { through: UserProjects });

sequelize.sync({force: true});

module.exports =  {
  User: User,
  Project: Project,
  Channel: Channel,
  sequelize: sequelize,
};
