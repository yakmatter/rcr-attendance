import DS from 'ember-data';
import { computed }  from '@ember/object';
import { isPresent }  from '@ember/utils';

const { Model, hasMany, attr } = DS;

export default Model.extend({
  name: attr('string'),
  derbyName: attr('string'),
  teamName: attr('string'),
  teams: hasMany('team'),
  attendances: hasMany('attendance')
}).reopen({
  displayName: computed('derbyName', 'name', function() {
    return isPresent(this.get('derbyName')) ? this.get('derbyName') : this.get('name');
  }),
  team: computed('teams.[]', function() {
    return this.get('teams').findBy('isHomeTeam', true) || this.get('teams.firstObject');
  })
});
