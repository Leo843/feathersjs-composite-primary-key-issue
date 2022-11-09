// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const myService = sequelizeClient.define('my_service', {
    key1: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    key2: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true
    }
  }, {
    timestamps: false,
    hooks: {
      beforeCount (options) {
        options.raw = true
        options.distinct = false
      }
    }
  })

  // eslint-disable-next-line no-unused-vars
  myService.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  }

  return myService
}
