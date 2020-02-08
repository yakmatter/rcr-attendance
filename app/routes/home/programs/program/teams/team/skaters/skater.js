import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller, model) {
    let team = this.modelFor('home/programs/program/teams/team');
    controller.set('team', team);
    controller.set('model', model);
  }
});
