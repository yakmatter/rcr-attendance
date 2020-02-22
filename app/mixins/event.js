import Mixin from '@ember/object/mixin';
import ErrorHandler from 'rcr-attendance/mixins/error-handler';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Mixin.create(ErrorHandler, {
  header: service(),
  model(params) {
    return this.store.findRecord('event', params.event_id, { reload: true });
  },
  afterModel(event) {
    this.set('header.event', event);
    let promises = {};

    /*
      fetch skaters then add `sortName` to attendance
      if skater is not on one of the event teams,
      prepend `_sortName` to force guest skaters to the top
     */
    const query = { _id: event.hasMany('attendances').ids() };
    // use store, as event.get('attendances') was failing on subsequent revisits
    return this.store.query('attendance', query).then(attendances => {
      attendances = attendances.toArray();
      attendances.forEach(attendance => {
        promises[attendance.id] = attendance.get('skater');
      });
      return hash(promises).then(results => {
        const eventTeamIds = event.hasMany('teams').ids();
        attendances.forEach(attendance => {
          const skater = results[attendance.id];
          let sortName = skater.get('displayName');
          const skaterTeamIds = skater.hasMany('teams').ids();
          if (skaterTeamIds.every(skaterTeamId => !eventTeamIds.includes(skaterTeamId))) {
            sortName = `_${sortName}`;
            attendance.set('isGuestSkater', true);
          }
          attendance.set('sortName', sortName);
        });
        return this.set('attendances', attendances);
      });
    });
  },
  setupController(controller) {
    this._super(...arguments);
    controller.set('attendances', this.get('attendances'));
  },
  actions: {
    willTransition() {
      this.set('header.event', null);
      return true;
    }
  }
});
