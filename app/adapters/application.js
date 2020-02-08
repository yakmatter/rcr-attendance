import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';
const { RESTAdapter } = DS;
import $ from 'jquery';

export default RESTAdapter.extend(DataAdapterMixin, {
  host: config.apiHost,
  namespace: 'api/v1',
  authorizer: 'authorizer:oauth2',
  coalesceFindRequests: true,
  init() {
    this._super(...arguments);
    $.ajaxSettings.traditional = true;
  },
  findMany(store, type, ids, snapshots) {
    var serializer = store.serializerFor(type.modelName);
    let primaryKey = serializer.get('primaryKey');

    var url = this.buildURL(type.modelName, ids, snapshots, 'findMany');
    let data = {};
    data[primaryKey] = ids;
    data.limit = ids.length;
    return this.ajax(url, 'GET', { data });
  },
  authorize(xhr) {
    let { access_token } = this.get('session.data.authenticated');
    xhr.setRequestHeader('Authorization', access_token);
  }
});
