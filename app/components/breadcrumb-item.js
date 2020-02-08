import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed }  from '@ember/object';

export default Component.extend({
  tagName: '',
  router: service(),
  isCurrentRoute: computed('route', 'router.currentRouteName', function() {
    const currentRouteName = this.get('router.currentRouteName').replace('.index', '');
    return currentRouteName === this.get('route');
  })
});
