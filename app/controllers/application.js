import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Controller.extend({
  header: service(),
  session: service(),
  router: service(),
  activeRoute: reads('router.currentRouteName'),
  eventsRouteIsActive: computed('activeRoute', function() {
    return this.get('activeRoute').startsWith('home.events');
  }),

  shouldShowHomeButton: computed('router.currentRouteName', function() {
    return this.get('router.currentRouteName') !== 'launcher';
  }),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
