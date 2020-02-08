import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export default Controller.extend({
  session: service(),
  ajax: service('rcr-ajax'),
  downloadAsCsv(json, filename) {
    const cleanData = (data, isDate = false) => {
      let cleanedData = data;
      if (isDate) {
        if (data) {
          cleanedData = moment(data).format(DATE_FORMAT);
        }
        else {
          cleanedData = '';
        }
      }
      else if (typeof data !== 'boolean') {
        if (data) {
          // eslint-disable-next-line no-useless-escape
          cleanedData = data.replace('"', '\"');
        }
        else {
          cleanedData = '';
        }
      }
      return `"${cleanedData}"`;
    };
    let csv = '"team","skater","derbyName","event","eventStartTime","attended","offSkates","timeIn"\n';

    json.forEach(row => {

      csv += `${cleanData(row.team)},${cleanData(row.skater)},${cleanData(row.derbyName)},${cleanData(row.event)},${cleanData(row.eventStartTime, true)},${cleanData(row.attended)},${cleanData(row.offSkates)},${cleanData(row.timeIn, true)}\n`;
    });

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = `${filename}.csv`;
    hiddenElement.click();
    // link.click();
    // document.removeChild(hiddenElement);
  },

  actions: {
    downloadReport() {
      this.ajax.request('/reports').then(report => {
        this.downloadAsCsv(report, 'Attendances', true);
      });
    }
  }
});
