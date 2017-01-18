'use strict';

const _ = require('lodash');
const browserSync = require('browser-sync');
const nodemon = require('nodemon');
const chalk = require('chalk');

module.exports = class {
    constructor(nodemonOptions, browserSyncOptions, pluginOptions) {
        let defaultPluginOptions = {
            reload: true,
            name: 'nodemon-browsersync-webpack-plugin',
            callback: null
        };

        this.nodemonOptions = _.extend({}, nodemonOptions);
        this.browserSyncOptions = _.extend({}, browserSyncOptions);
        this.options = _.extend({}, defaultPluginOptions, pluginOptions);

        this.browserSync = browserSync.create(this.options.name);
        this.isWebpackWatching = false;
        this.isBrowserSyncRunning = false;
    }

    /**
     *
     * @param compiler
     */
    apply(compiler) {

        // start nodemon on compile lifecycle
        compiler.plugin('compile', () => {
            if (this.isWebpackWatching) {
                nodemon(this.nodemonOptions).on('start', () => {
                    console.log(`[${chalk.blue('Nodemon')}] ${chalk.cyan('Restarting...')}`);
                    setTimeout(() => {
                        this.browserSync.reload();
                    }, 500);
                });
            }
        });

        compiler.plugin('watch-run', (watching, callback) => {
            this.isWebpackWatching = true;
            callback(null, null);
        });

        compiler.plugin('compilation', () => {
            if (this.isBrowserSyncRunning) {
                this.browserSync.notify('Rebuilding...');
            }
        });

        compiler.plugin('done', () => {
            if (this.isWebpackWatching) {
                if (this.isBrowserSyncRunning) {
                    if (this.options.reload) {
                        this.browserSync.reload();
                    }
                } else {
                    if (_.isFunction(this.options.callback)) {
                        this.browserSync.init(this.browserSyncOptions, this.options.callback);
                    } else {
                        this.browserSync.init(this.browserSyncOptions);
                    }

                    this.isBrowserSyncRunning = true;
                }
            }
        });
    }
};
