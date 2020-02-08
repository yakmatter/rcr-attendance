import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  header: service(),
  session: service(),
  router: service(),
  shouldShowHomeButton: computed('router.currentRouteName', function() {
    return this.get('router.currentRouteName') !== 'launcher';
  }),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
