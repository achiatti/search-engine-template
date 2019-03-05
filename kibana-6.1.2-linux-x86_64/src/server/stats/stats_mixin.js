'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statsMixin = statsMixin;

var _stats = require('./stats');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function statsMixin(kbnServer, server) {

  /**
   *  Get a summary about the number of objects in the kibana index
   *  @name server.getKibanaStats
   *  @param {Object} options
   *  @property {Function} options.callCluster method for calling the elasticsearch cluster
   *
   *  NOTE: this API will be moved out to an external plugin in 6.1, and likely
   *  have breaking changes in the format of the response data
   */
  server.decorate('server', 'getKibanaStats', (() => {
    var _ref = _asyncToGenerator(function* ({ callCluster }) {
      const savedObjectsClient = server.savedObjectsClientFactory({ callCluster });
      return yield (0, _stats.getStats)(server.config().get('kibana.index'), savedObjectsClient);
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })());
}
