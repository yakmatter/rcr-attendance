import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',
  router: service(),
  isActive: computed('model.id', 'router.currentURL', function() {
    return this.get('router.currentURL').includes(this.get('model.id'));
  }),
});
