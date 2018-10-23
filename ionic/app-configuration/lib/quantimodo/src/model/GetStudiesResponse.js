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
    define(['ApiClient', 'model/ExplanationStartTracking', 'model/Image', 'model/Study'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ExplanationStartTracking'), require('./Image'), require('./Study'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.GetStudiesResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.ExplanationStartTracking, root.Quantimodo.Image, root.Quantimodo.Study);
  }
}(this, function(ApiClient, ExplanationStartTracking, Image, Study) {
  'use strict';




  /**
   * The GetStudiesResponse model module.
   * @module model/GetStudiesResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>GetStudiesResponse</code>.
   * @alias module:model/GetStudiesResponse
   * @class
   * @param description {String} Ex: These factors are most predictive of Overall Mood based on your own data.
   * @param summary {String} Can be used as title in help info popup
   */
  var exports = function(description, summary) {
    var _this = this;


    _this['description'] = description;
    _this['summary'] = summary;





  };

  /**
   * Constructs a <code>GetStudiesResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetStudiesResponse} obj Optional instance to populate.
   * @return {module:model/GetStudiesResponse} The populated <code>GetStudiesResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('studies')) {
        obj['studies'] = ApiClient.convertToType(data['studies'], [Study]);
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('summary')) {
        obj['summary'] = ApiClient.convertToType(data['summary'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = Image.constructFromObject(data['image']);
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('startTracking')) {
        obj['startTracking'] = ExplanationStartTracking.constructFromObject(data['startTracking']);
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('html')) {
        obj['html'] = ApiClient.convertToType(data['html'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/Study>} studies
   */
  exports.prototype['studies'] = undefined;
  /**
   * Ex: These factors are most predictive of Overall Mood based on your own data.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * Can be used as title in help info popup
   * @member {String} summary
   */
  exports.prototype['summary'] = undefined;
  /**
   * @member {module:model/Image} image
   */
  exports.prototype['image'] = undefined;
  /**
   * Ex: ion-ios-person
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * @member {module:model/ExplanationStartTracking} startTracking
   */
  exports.prototype['startTracking'] = undefined;
  /**
   * Ex: Top Predictors of Overall Mood
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * Embeddable list of study summaries with explanation at the top
   * @member {String} html
   */
  exports.prototype['html'] = undefined;



  return exports;
}));


