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
    define(['ApiClient', 'model/Correlation', 'model/Explanation'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Correlation'), require('./Explanation'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.GetCorrelationsDataResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.Correlation, root.Quantimodo.Explanation);
  }
}(this, function(ApiClient, Correlation, Explanation) {
  'use strict';




  /**
   * The GetCorrelationsDataResponse model module.
   * @module model/GetCorrelationsDataResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>GetCorrelationsDataResponse</code>.
   * @alias module:model/GetCorrelationsDataResponse
   * @class
   * @param correlations {Array.<module:model/Correlation>} 
   * @param explanation {module:model/Explanation} 
   */
  var exports = function(correlations, explanation) {
    var _this = this;

    _this['correlations'] = correlations;
    _this['explanation'] = explanation;
  };

  /**
   * Constructs a <code>GetCorrelationsDataResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetCorrelationsDataResponse} obj Optional instance to populate.
   * @return {module:model/GetCorrelationsDataResponse} The populated <code>GetCorrelationsDataResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('correlations')) {
        obj['correlations'] = ApiClient.convertToType(data['correlations'], [Correlation]);
      }
      if (data.hasOwnProperty('explanation')) {
        obj['explanation'] = Explanation.constructFromObject(data['explanation']);
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/Correlation>} correlations
   */
  exports.prototype['correlations'] = undefined;
  /**
   * @member {module:model/Explanation} explanation
   */
  exports.prototype['explanation'] = undefined;



  return exports;
}));


