import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  header: service(),
  session: service(),
  model(params) {
    return this.store.findRecord('team', params.team_id);
  },
  afterModel(team, transition) {
    this.set('header.team', team);
    const preventTransitionToEvent = transition.queryParams.preventTransitionToEvent;
    if (preventTransitionToEvent === true) {
      return;
    }
      // if (!this.get('session.user.isAdmin')) {
        this.transitionTo('home.programs.program.teams.team.events');
      // }
  },
  // actions: {
  //   willTransition() {
  //     this.set('header.team', null);
  //     return true;
  //   }
  // }
});
