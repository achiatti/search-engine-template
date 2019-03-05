'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _lodash = require('lodash');

var _path = require('path');

const arr = v => [].concat(v || []);

class UiBundlerEnv {
  constructor(workingDir) {

    // the location that bundle entry files and all compiles files will
    // be written
    this.workingDir = workingDir;

    // the context that the bundler is running in, this is not officially
    // used for anything but it is serialized into the entry file to ensure
    // that they are invalidated when the context changes
    this.context = {};

    // the plugins that are used to build this environment
    // are tracked and embedded into the entry file so that when the
    // environment changes we can rebuild the bundles
    this.pluginInfo = [];

    // regular expressions which will prevent webpack from parsing the file
    this.noParse = [/node_modules[\/\\](angular|elasticsearch-browser)[\/\\]/, /node_modules[\/\\](mocha|moment)[\/\\]/];

    // webpack aliases, like require paths, mapping a prefix to a directory
    this.aliases = {
      ui: (0, _utils.fromRoot)('src/ui/public'),
      ui_framework: (0, _utils.fromRoot)('ui_framework'),
      packages: (0, _utils.fromRoot)('packages'),
      test_harness: (0, _utils.fromRoot)('src/test_harness/public'),
      querystring: 'querystring-browser',
      moment$: (0, _utils.fromRoot)('webpackShims/moment'),
      'moment-timezone$': (0, _utils.fromRoot)('webpackShims/moment-timezone')
    };

    // map of which plugins created which aliases
    this.aliasOwners = {};

    // loaders that are applied to webpack modules after all other processing
    // NOTE: this is intentionally not exposed as a uiExport because it leaks
    // too much of the webpack implementation to plugins, but is used by test_bundle
    // core plugin to inject the instrumentation loader
    this.postLoaders = [];
  }

  consumePlugin(plugin) {
    const tag = `${plugin.id}@${plugin.version}`;
    if ((0, _lodash.includes)(this.pluginInfo, tag)) return;

    if (plugin.publicDir) {
      this.aliases[`plugins/${plugin.id}`] = plugin.publicDir;
    }

    this.pluginInfo.push(tag);
  }

  exportConsumer(type) {
    switch (type) {
      case 'noParse':
        return (plugin, spec) => {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = arr(spec)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              const rule = _step.value;

              this.noParse.push(this.getNoParseRegexp(rule));
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        };

      case '__globalImportAliases__':
        return (plugin, spec) => {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = Object.keys(spec)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              const key = _step2.value;

              this.aliases[key] = spec[key];
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        };
    }
  }

  addContext(key, val) {
    this.context[key] = val;
  }

  addPostLoader(loader) {
    this.postLoaders.push(loader);
  }

  getNoParseRegexp(rule) {
    if (typeof rule === 'string') {
      return new RegExp(`${(0, _path.isAbsolute)(rule) ? '^' : ''}${(0, _lodash.escapeRegExp)(rule)}`);
    }

    if (rule instanceof RegExp) {
      return rule;
    }

    throw new Error('Expected noParse rule to be a string or regexp');
  }
}
exports.default = UiBundlerEnv;
module.exports = exports['default'];
