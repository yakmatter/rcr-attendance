import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ErrorHandler from 'rcr-attendance/mixins/error-handler';
import { inject as service } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, ErrorHandler, {
  notify: service(),
  init() {
    this._super(...arguments);
    this.notify.clear();
  },
});
