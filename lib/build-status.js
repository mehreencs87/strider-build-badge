module.exports = function (name, context, callback) {
  var Job = context.models.Job
  name = name.toLowerCase()

  Job.findOne()
    .sort({'finished': -1})
    .where('finished').ne(null)
    .where('archived', null)
    .where('project', name)
    .exec(function (error, job) {
      var status = 'failing';
      var color = 'red';
      var img = 'https://img.shields.io/badge/build-%status-%color.svg?style=flat-square'
      if (error || !job) {
        status = 'unknown'
        color = 'lightgrey'
      } else if (job.test_exitcode === 0) {
        status = 'passing'
        color = 'green'
      } else if (job) {
        status = 'pending'
        color: 'yellow'
      }

      callback(error, img.replace('%status', status).replace('%color', color));
    })
}
