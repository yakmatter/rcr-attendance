import DS from 'ember-data';

const { Model, hasMany, attr } = DS;

export default Model.extend({
  name: attr('string'),
  logo: attr('string'),
  teams: hasMany('team'),
  sortOrder: attr('number')
});
