import Component from '@ember/component';
import { computed }  from '@ember/object';
import { isPresent, isEmpty }  from '@ember/utils';
import { makeArray }  from '@ember/array';
import moment from 'moment';

export default Component.extend({
  durationUnit: 'hours',
  duration: 1,
  startTime: null,
  endTime: computed('startTime', 'duration', 'durationUnit', function() {
    const startTime = this.get('startTime');
    const duration = this.get('duration');
    const durationUnit = this.get('durationUnit');
    if (isEmpty(startTime) || !Number.isSafeInteger(duration)) {
      return null;
    }
    return moment(startTime).add(duration, durationUnit).toDate();
  }),
  name: null,
  eventTypes: null,
  selectedEventType: null,
  userChangedEventName: null,
  availableTeams: null,
  autoEventName() {
    const startTime = this.get('startTime');
    if (isPresent(startTime) && !this.get('userChangedEventName')) {
      const date = moment(startTime).format('MM/DD, h:mm A');
      const eventType = this.get('selectedEventType');
      const teamName = eventType === 'practice' ? this.get('team.name') : this.get('team.program.name');
      let name = `${date} - ${teamName} - ${eventType}`;
      this.set('name', name);
    }
  },
  actions: {
    updateStartTime(date) {
      this.set('startTime', date);
      this.autoEventName();
    },
    updateDuration(event) {
      this.set('duration', event.target.valueAsNumber);
    },
    updateEventType(eventType) {
      this.set('selectedEventType', eventType);
      this.autoEventName();
    },
    updateEventTeams(availableTeam) {
      availableTeam.toggleProperty('_isSelected');
      const selectedTeams = this.get('availableTeams').filter(team => team._isSelected);
      this.set('selectedTeams', selectedTeams);
    },
    createEvent() {
      const event = {
        name: this.get('name'),
        startTime: this.get('startTime'),
        endTime: this.get('endTime'),
        type: this.get('selectedEventType'),
        teams: this.get('selectedTeams'),
        credits: 1
      };
      this.get('createEvent')(event);
    },
    updateName(event) {
      this.set('name', event.target.value);
    }
  },
  canCreateEvent: computed('name', 'startTime', 'endTime', 'team', function() {
    return (
      isPresent(this.get('name')) &&
      isPresent(this.get('startTime')) &&
      isPresent(this.get('endTime')) &&
      isPresent(this.get('team'))
    );
  }),
  setAvailableTeams() {
    const currentTeam = this.get('team');
    this.get('team.program.teams').then(teams => {
      const isHomeTeam = currentTeam.get('isHomeTeam');
      let availableTeams = teams.filter(team => team.get('isHomeTeam') === isHomeTeam).map(team => {
        const isCurrentTeam = team.get('id') === currentTeam.get('id');
        team.set('_isSelected', isCurrentTeam);
        team.set('_isDisabled', isCurrentTeam);
        return team;
      });
      this.set('availableTeams', availableTeams);
      this.set('selectedTeams', makeArray(currentTeam));
    });
  },
  selectedTeams: null,
  init() {
    this._super(...arguments);
    this.set('eventTypes', ['practice', 'scrimmage']);
    this.set('selectedEventType', 'practice');
    if (this.team) {
      this.setAvailableTeams();
    }
  },
});
