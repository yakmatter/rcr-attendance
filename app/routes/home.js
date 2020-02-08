import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  afterModel() {
    const sessionData = this.get('session.data');
    this.set('session.user', sessionData.authenticated.user);
    return;
  }
});
