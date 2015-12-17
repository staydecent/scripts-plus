'use strict';

var spawn = require('child_process').spawn;
var Orchestrator = require('orchestrator');
var argv = require('yargs').argv;

var tasks = new Orchestrator();

module.exports = {
  argv: argv,

  add: tasks.add,

  tasks: tasks.tasks,

  spawn: function(bin, args, done) {
    var cmd  = spawn(bin, args || []);

    cmd.stdout.on('data', logBuffer);
    cmd.stderr.on('data', logBuffer);

    cmd.on('exit', function(code) {
      console.log('exit code: ' + code);

      if (typeof done === 'function') {
        done();
      }
    });
  },

  run: function() {
    var argv = argv;
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