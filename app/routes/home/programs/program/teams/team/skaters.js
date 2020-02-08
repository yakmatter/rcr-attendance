import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let { team_id } = this.paramsFor('home.programs.program.teams.team');
    return this.store.query('skater', { team: team_id }).then(skaters => skaters.sortBy('displayName'));
  }
});
