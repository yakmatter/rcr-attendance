import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed }  from '@ember/object';

export default Component.extend({
  tagName: '',
  session: service(),
  isVisitingSkater: computed('event.teams.[]', 'attendance.skater.team', function() {
    const eventTeamIds = this.get('event').hasMany('teams').ids();
    const skaterTeamId = this.get('attendance.skater.team.id');

    return eventTeamIds.includes(skaterTeamId) === false;
  }),
  // attendanceCount: computed('event')
  actions: {
    markAttendance(attendance, checked) {
      attendance.set('attended', checked);
      this.markAttendance(attendance);
    },
    markOffSkates(attendance, checked) {
      attendance.set('offSkates', checked);
      this.markOffSkates(attendance);
    },
    showRelatedEvents(attendance) {
      this.showRelatedEvents(attendance);
    }
  }
});
