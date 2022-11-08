// Initializes the `my-service` service on path `/my-service`
const { MyService } = require('./my-service.class')
const createModel = require('../../models/my-service.model')
const hooks = require('./my-service.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  // Initialize our service with any options it requires
  app.use('/my-service', new MyService(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('my-service')

  service.hooks(hooks)
}
