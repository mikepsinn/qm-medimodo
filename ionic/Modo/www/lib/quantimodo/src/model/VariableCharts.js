/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Chart'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Chart'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.VariableCharts = factory(root.Quantimodo.ApiClient, root.Quantimodo.Chart);
  }
}(this, function(ApiClient, Chart) {
  'use strict';




  /**
   * The VariableCharts model module.
   * @module model/VariableCharts
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>VariableCharts</code>.
   * An object with various chart properties each property contain and svg and Highcharts configuration
   * @alias module:model/VariableCharts
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>VariableCharts</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/VariableCharts} obj Optional instance to populate.
   * @return {module:model/VariableCharts} The populated <code>VariableCharts</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('hourlyColumnChart')) {
        obj['hourlyColumnChart'] = Chart.constructFromObject(data['hourlyColumnChart']);
      }
      if (data.hasOwnProperty('monthlyColumnChart')) {
        obj['monthlyColumnChart'] = Chart.constructFromObject(data['monthlyColumnChart']);
      }
      if (data.hasOwnProperty('distributionColumnChart')) {
        obj['distributionColumnChart'] = Chart.constructFromObject(data['distributionColumnChart']);
      }
      if (data.hasOwnProperty('weekdayColumnChart')) {
        obj['weekdayColumnChart'] = Chart.constructFromObject(data['weekdayColumnChart']);
      }
      if (data.hasOwnProperty('lineChartWithoutSmoothing')) {
        obj['lineChartWithoutSmoothing'] = Chart.constructFromObject(data['lineChartWithoutSmoothing']);
      }
      if (data.hasOwnProperty('lineChartWithSmoothing')) {
        obj['lineChartWithSmoothing'] = Chart.constructFromObject(data['lineChartWithSmoothing']);
      }
    }
    return obj;
  }

  /**
   * @member {module:model/Chart} hourlyColumnChart
   */
  exports.prototype['hourlyColumnChart'] = undefined;
  /**
   * @member {module:model/Chart} monthlyColumnChart
   */
  exports.prototype['monthlyColumnChart'] = undefined;
  /**
   * @member {module:model/Chart} distributionColumnChart
   */
  exports.prototype['distributionColumnChart'] = undefined;
  /**
   * @member {module:model/Chart} weekdayColumnChart
   */
  exports.prototype['weekdayColumnChart'] = undefined;
  /**
   * @member {module:model/Chart} lineChartWithoutSmoothing
   */
  exports.prototype['lineChartWithoutSmoothing'] = undefined;
  /**
   * @member {module:model/Chart} lineChartWithSmoothing
   */
  exports.prototype['lineChartWithSmoothing'] = undefined;



  return exports;
}));


