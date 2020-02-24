import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  addSkater: () => {},
  addUnfoundSkater: () => {},
  actions: {
    addUnfoundSkater() {
      this.addUnfoundSkater(...arguments);
    },
    addGuestSkater(skater) {
      skater.set('didConfirmGuestSkater', true);
      this.addSkater(skater);
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
