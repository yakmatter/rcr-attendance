import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  notify: service(),
  actions: {
    error(error) {
      this.notify.error(error);

      return true;
    }
  }
});
