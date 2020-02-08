import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', function() {
    this.route('programs', function() {
      this.route('program', { path: '/:program_id' }, function() {
        this.route('teams', function() {
          this.route('team', { path: '/:team_id' }, function() {
            this.route('skaters', function() {
              this.route('skater', { path: '/:skater_id' });
            });
            this.route('events', function() {
              this.route('event', { path: '/:event_id' });
            });
          });
        });
      });
    });
    this.route('events', function() {
      this.route('event', { path: '/:event_id' });
    });
    this.route('volunteers');
  });
  this.route('login');
  this.route('launcher');
});

export default Router;
