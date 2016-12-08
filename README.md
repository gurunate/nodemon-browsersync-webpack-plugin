# Nodemon Browsersync Webpack Plugin
A [webpack](https://webpack.github.io/) plugin that starts and reloads [Nodemon](https://nodemon.io/) and [Browsersync](https://www.browsersync.io/).  It is useful when developing web applications that leverage both server-side rendered HTML pages and webpack bundles.

Initially based on [Va1/browser-sync-webpack-plugin](https://github.com/Va1/browser-sync-webpack-plugin)

## Installation
Install the plugin with npm:

```shell
$ npm install nodemon-browsersync-webpack-plugin --save-dev
```

## Usage

```shell
$ webpack --watch
```

### Basic

Pass [Nodemon options](https://github.com/remy/nodemon/blob/master/doc/requireable.md) and [BrowserSync options](https://browsersync.io/docs/options/) into the plugin in that order.

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
      script: 'server.js',
      ignore: [
          "src/*", 
          "public/*"
      ],
      ext: 'js json',
      verbose: true
    }, {
      proxy: 'localhost:8001'
    )
  ]
};
```

In the example above, Browsersync will wrap your vhost with a _proxy_ URL to view your site.

*NOTE:* For reusabilty, a `nodemon.json` configuration file is recommended rather than embedding Nodemon options in the plugin.  Checkout the [sample nodemon.json](https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md) for further details.

## Contributing

Feel free to open issues to propose stuff and participate. Pull requests are also welcome.

## License

[MIT]()
