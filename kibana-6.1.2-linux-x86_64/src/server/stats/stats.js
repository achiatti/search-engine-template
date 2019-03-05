'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStats = undefined;

let getStatsForType = (() => {
  var _ref = _asyncToGenerator(function* (savedObjectsClient, type) {
    var _ref2 = yield savedObjectsClient.find({ type, perPage: 0 });

    const total = _ref2.total;

    return { total };
  });

  return function getStatsForType(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let getStats = exports.getStats = (() => {
  var _ref3 = _asyncToGenerator(function* (kibanaIndex, savedObjectsClient) {
    const types = ['dashboard', 'visualization', 'search', 'index-pattern'];
    const requests = types.map(function (type) {
      return getStatsForType(savedObjectsClient, type);
    });
    const results = yield Promise.all(requests);
    const stats = {};

    results.forEach(function (statsForType, index) {
      stats[(0, _lodash.snakeCase)(types[index])] = statsForType;
    });

    stats.index = kibanaIndex;
    return stats;
  });

  return function getStats(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
})();

var _lodash = require('lodash');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
