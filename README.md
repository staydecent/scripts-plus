# scripts-plus
Arbitrary build scripts helper.

[![bitHound Overall Score](https://www.bithound.io/github/staydecent/scripts-plus/badges/score.svg)](https://www.bithound.io/github/staydecent/scripts-plus) [![Build Status](https://travis-ci.org/staydecent/scripts-plus.svg)](https://travis-ci.org/staydecent/scripts-plus)

## Background

I prefer using [npm scripts](https://docs.npmjs.com/misc/scripts), for defining build tasks, over Gulp, Grunt etc. as no packages need to be installed globally. As well, Gulp and Grunt require using specific wrappers around the tools I want to use. `jshint` is not good enough, I would also need to require `gulp-jshint`. 

Most build packages provide a nice CLI, which can simply be spawned with conveniently defined default params.

```javascript
{
  "scripts": {
    "lint": "jshint client/**/*.js",
    "test": "karma start karma.conf.js --browsers Firefox --single-run"
  }
}
```

An issue can arise with larger apps which have many dependencies and many build scripts.
```
{
  lint,
  test,
  e2e,
  watch-css,
  watch-js,
  watch-statics,
  watch,
  build-js,
  build,
  deploy,
  release,
  ...
}
```

This makes the `package.json` very dense and harder to manage. `scripts-plus` allows you to break out your npm scripts into a js file, which remains terse and is familiar to Gulp users.

## Example

```javascript
var scripts = require('scripts-plus');
var argv = scripts.argv(); // `node my-scripts.js build --minify` => `args.minify === true`

scripts.add('default', ['build']);
scripts.add('build', ['build-js']);

scripts.add('build-js', ['lint'], function(done) {
  var args = ['src/index.js'];
  if (argv.minify) {
    args.concat(['|', 'uglifyjs', '-c', '>', 'dist/bundle.js']);
  } else {
    args.concat(['-o', 'dist/bundle.js']);
  }
  scripts.spawn('browserify', args, done);
});

...

scripts.run();
```
