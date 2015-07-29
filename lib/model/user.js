var Model = require('../model');

var Authorization = Model.requires('authorization');
var Provider = Model.requires('provider');

var User = module.exports = new Model('User', {
  name: Model.DataTypes.STRING,
  profile: Model.DataTypes.TEXT,
});

User.belongsToMany(Authorization, { through: 'UserAuthorizations' });
Authorization.belongsToMany(User, { through: 'UserAuthorizations' });

User.belongsToMany(Provider, { through: 'UserProviders' });
Provider.belongsToMany(User, { through: 'UserProviders' });