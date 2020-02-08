import Component from '@ember/component';

export default Component.extend({
  classNames: ['ui', 'large', 'label'],
  classNameBindings: [
    'event.isReady:blue',
    'event.isNext:blue',
    'event.isNow:green'
  ]
});
