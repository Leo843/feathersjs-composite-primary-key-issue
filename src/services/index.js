const myService = require('./my-service/my-service.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(myService)
}
