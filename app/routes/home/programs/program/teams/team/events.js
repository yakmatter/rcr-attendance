import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

export default Route.extend({
  session: service(),
  model() {
    let { team_id } = this.paramsFor('home.programs.program.teams.team');
    return this.store.query('event', { team: team_id });
  },
  afterModel(events, transition) {
    const preventTransitionToEvent = transition.queryParams.preventTransitionToEvent;

    if (preventTransitionToEvent === 'true') {
      return;
    }


    // if (!this.get('session.user.isAdmin')) {
      let currentEvent = null;
      events.forEach(event => {
        if (event.get('isToday')) {
          currentEvent = event;
        }
        else if (event.get('isNext')) {
          currentEvent = event;
        }
        else if (event.get('isNow')) {
          currentEvent = event;
        }
        else if (event.get('isReady')) {
          currentEvent = event;
        }
      });
      if (isPresent(currentEvent)) {
        this.transitionTo('home.programs.program.teams.team.events.event', currentEvent);
      }
    }
  // }
});
