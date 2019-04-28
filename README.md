CLIENT-SIDE CONFIG:

  SCSS Support
  What are these packages for?

node-sass provides binding for Node.js to LibSass, a Sass compiler.
sass-loader is a loader for Webpack for compiling SCSS/Sass files.
style-loader injects our styles into our DOM.
css-loader interprets @import and @url() and resolves them.
mini-css-extract-plugin extracts our CSS out of the JavaScript bundle into a separate file, essential for production builds.

HEROKU DEPLOYMENT:

need to set heroku config:set NPM_CONFIG_PRODUCTION=false

2 separate build:
1 Server git subtree push --prefix voting-server heroku/votymcvoteface master
2 Client git subtree push --prefix voting-client heroku/votymcclient master


OLD SCRIPTS PRE CREATE REACT APP:
    "test": "mocha --require @babel/register --require ./test/test_helper.js --require ignore-styles \"test/**/*@(.js|.jsx)\"",
    "test:watch": "npm test -- --watch",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js",
    "build:local": "cross-env NODE_ENV=development webpack --config webpack.config.js",
    "build:prodlocal": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "start": "serve -s build"