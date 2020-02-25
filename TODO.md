# rcr-attendance

## To do list

### Get tests passing again
- tests now pass in localhost browser: [http://localhost:4200/tests](http://localhost:4200/tests)
- `ember test` fails with (not sure why):
```
not ok 1 Chrome 80.0 - [undefined ms] - Global error: Uncaught ReferenceError: Ember is not defined at http://localhost:7357/23067392361486/tests/index.html?hidepassed, line 37
```

### Write more meaningful tests
There is hardly any meaningful test coverage


### Fix Attendance.relatedAttendances
These are other events in the same day that a skater might check in for.
The current implementation is not the least bit scalable.  It fetches every single attendance for the skater, then filters by today as it renders.  I think the backend should handle this.


### Allow more write access for Admin
Things like:
- Edit an event after creation
- Change a skater's name
- Add a skater
- Move a skater from one team to another
- Import CSV ...see the rcr-attendance-data TODO


### Setup CI pipeline (Travis?)
Right now I just sort of manually run tests and push directly to master.


### ~~Allow unfound skaters to be added to DB and event~~
~~Sometimes skaters are not yet in the database.  They should still be able to sign in.~~


### ~~Share code between home.events and home.programs.teams.events~~
~~There's some code here which could be shared using mixins~~
