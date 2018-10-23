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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.XprofileDatum = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The XprofileDatum model module.
   * @module model/XprofileDatum
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>XprofileDatum</code>.
   * @alias module:model/XprofileDatum
   * @class
   * @param id {Number} What do you expect?
   * @param fieldId {Number} What do you expect?
   * @param userId {Number} What do you expect?
   * @param value {String} What do you expect?
   * @param lastUpdated {String} What do you expect?
   */
  var exports = function(id, fieldId, userId, value, lastUpdated) {
    var _this = this;

    _this['id'] = id;
    _this['fieldId'] = fieldId;
    _this['userId'] = userId;
    _this['value'] = value;
    _this['lastUpdated'] = lastUpdated;

  };

  /**
   * Constructs a <code>XprofileDatum</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/XprofileDatum} obj Optional instance to populate.
   * @return {module:model/XprofileDatum} The populated <code>XprofileDatum</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('fieldId')) {
        obj['fieldId'] = ApiClient.convertToType(data['fieldId'], 'Number');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'String');
      }
      if (data.hasOwnProperty('lastUpdated')) {
        obj['lastUpdated'] = ApiClient.convertToType(data['lastUpdated'], 'String');
      }
      if (data.hasOwnProperty('metaDataArray')) {
        obj['metaDataArray'] = ApiClient.convertToType(data['metaDataArray'], [Object]);
      }
    }
    return obj;
  }

  /**
   * What do you expect?
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * What do you expect?
   * @member {Number} fieldId
   */
  exports.prototype['fieldId'] = undefined;
  /**
   * What do you expect?
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * What do you expect?
   * @member {String} value
   */
  exports.prototype['value'] = undefined;
  /**
   * What do you expect?
   * @member {String} lastUpdated
   */
  exports.prototype['lastUpdated'] = undefined;
  /**
   * Additional xprofiledatum key-value data
   * @member {Array.<Object>} metaDataArray
   */
  exports.prototype['metaDataArray'] = undefined;



  return exports;
}));


