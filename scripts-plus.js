'use strict';

var spawn = require('child_process').spawn;
var Orchestrator = require('orchestrator');

var tasks = new Orchestrator();

module.exports = {
  add: tasks.add,
  tasks: tasks.tasks,

  argv: function() {
    return require('yargs').argv;
  },

  spawn: function(bin, args, done) {
    var cmd  = spawn(bin, args || []);

    cmd.stdout.on('data', logBuffer);
    cmd.stderr.on('data', logBuffer);

    cmd.on('exit', function() {
      if (typeof done === 'function') {
        done();
      }
    });
  },

  run: function(argv) {
    var task = argv._[0] || 'default';

    tasks.start(task, function(err) {
      if (err) {
        console.error(task, err); 
      } else {
        console.log(task, 'completed!');
      }
    });
  }
};

function logBuffer(data) {
  console.log(''+data);
}