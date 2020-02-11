import DS from 'ember-data';
import { computed }  from '@ember/object';
import { dasherize }  from '@ember/string';

const { Model, hasMany, belongsTo, attr } = DS;

export default Model.extend({
  name: attr('string'),
  logo: attr('string'),
  program: belongsTo('program'),
  skaters: hasMany('skater'),
  sortOrder: attr('number'),
  isHomeTeam: attr('boolean')
}).reopen({
  className: computed('name', function() {
    // force string or undefined will blow up dasherize
    const name = `${this.get('name')}`;
    return dasherize(name);
  })
});
