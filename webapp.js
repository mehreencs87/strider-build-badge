var request = require('request');
var getBuildStatus = require('./lib/build-status')

module.exports = function (context, done) {
  context.app.get('/:org/:repo/badge', function (req, res) {
    var name = req.params.org + '/' + req.params.repo;

    getBuildStatus(name, context, function (error, imageName) {
      if (error) {
        console.error('[badge] error occured when getting badge: ' + error.message)
      }
      res.setHeader('Cache-Control', 'no-cache')
      request(imageName).pipe(res);
    });
  })
  done()
}
