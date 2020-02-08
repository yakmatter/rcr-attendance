import DS from 'ember-data';
import { computed }  from '@ember/object';
import { isPresent }  from '@ember/utils';

const { Model, belongsTo, hasMany, attr } = DS;

export default Model.extend({
  name: attr('string'),
  derbyName: attr('string'),
  teamName: attr('string'),
  team: belongsTo('team'),
  attendances: hasMany('attendance')
}).reopen({
  displayName: computed('derbyName', 'name', function() {
    return isPresent(this.get('derbyName')) ? this.get('derbyName') : this.get('name');
  })
});
