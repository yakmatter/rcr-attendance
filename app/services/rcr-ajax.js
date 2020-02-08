import AjaxService from 'ember-ajax/services/ajax';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import config from '../config/environment';

// import { host, namespace } from '../adapters/application';

export default AjaxService.extend({
  session: service(),
  host: config.apiHost,
  namespace: 'api/v1',
  headers: computed('session', {
    get() {
      let headers = {};

      let { access_token } = this.get('session.data.authenticated');
      if (access_token) {
        headers.Authorization = `Bearer ${access_token}`;
      }
      return headers;
    }
  })
});
