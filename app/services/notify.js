import Service from '@ember/service';

export default Service.extend({
  clear() {
    this.setProperties({
      message: null,
      messageClass: null
   });
 },
  error(message) {
    this.setProperties({
       message,
       messageClass: 'negative'
    });
  }
});
