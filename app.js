let db = require('./model');
let sequelize = db.sequelize;
let User = db.User;
let Channel = db.Channel;
let Project = db.Project;

let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let callback = require('./routes/callback');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/callback', callback);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err.message);
  console.log(err.message);
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    User.sync({force: true})
      .then(_ => {
        Project.sync({force: true});
      })
      .then(_ => {
        Channel.sync({force: true});
      });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
