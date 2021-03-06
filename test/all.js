/* globals describe, it */
'use strict';

var assert = require('chai').assert;
var scripts = require('../scripts-plus.js');

describe('scripts-plus', function () {
  it('should export module', function () {
    assert.ok(scripts);
    assert.isObject(scripts);
    assert.property(scripts, 'argv');
    assert.property(scripts, 'spawn');
    assert.property(scripts, 'run');
    assert.property(scripts, 'add');
  });

  it('should expose argv', function () {
    var argv = scripts.argv();
    assert.deepEqual(argv._, ['test/all.js']);
    assert.ok(argv.testBool);
  });

  it('should add tasks to Orchestrator', function () {
    scripts.add('testMe', function(done) { done(); });
    assert.property(scripts.tasks, 'testMe');
  });

});