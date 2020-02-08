import DS from 'ember-data';
import { merge } from '@ember/polyfills';

const { RESTSerializer } = DS;

export default RESTSerializer.extend({
  primaryKey: '_id',

  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    var normalizedPayload = {};
    normalizedPayload[primaryModelClass.modelName] = (payload.data) ? payload.data : payload;

    return this._super(store, primaryModelClass, normalizedPayload, id, requestType);
  },

  serializeIntoHash: function (data, type, record, options) {
    merge(data, this.serialize(record, options));
  },

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let normalizedPayload = {};
    if (payload.data && !Array.isArray(payload)) {
      normalizedPayload[primaryModelClass.modelName] = payload.data;
    }
    else {
      normalizedPayload[primaryModelClass.modelName] = payload;
    }

    return this._super(store, primaryModelClass, normalizedPayload, id, requestType);
  }

});
