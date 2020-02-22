import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  addUnfoundSkater: () => {},
  actions: {
    addUnfoundSkater() {
      this.addUnfoundSkater(...arguments);
    },
    toggleShouldShowInput(searchText) {
      this.toggleProperty('shouldShowInput');
      if (this.get('shouldShowInput')) {
        this.set('userName', searchText);
      }
      else {
        this.set('userName', null);
      }
    }
  }
});
