# nodemon-browsersync-webpack-plugin
A [webpack](https://webpack.github.io/) plugin that starts and reloads [Nodemon](https://nodemon.io/) and [Browsersync](https://www.browsersync.io/).  It is useful when developing web applications that leverage both server-side rendered HTML pages and webpack bundles.

## Installation
Install the plugin with npm:

`$ npm i -D nodemon-browsersync-webpack-plugin`

## Basic Usage


```javascript
const NodemonBrowsersyncPlugin = require('nodemon-browsersync-webpack-plugin');

module.exports = {
  entry: './src/js/entry.js',
  output: {
    path: './public/assets',
    filename: 'bundle.js'
  },
  plugins: [
    new NodemonBrowsersyncPlugin({
      proxy: 'localhost:8001'
    )
  ]
};
```

In the example above, Browsersync will wrap your vhost with a _proxy_ URL to view your site.

NOTE: a `nodemon.json` configuration file is recommended.
