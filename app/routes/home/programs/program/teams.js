import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let { program_id } = this.paramsFor('home.programs.program');
    return this.store.query('team', { program: program_id }).then(teams => teams.sortBy('sortOrder'));
  }
});
