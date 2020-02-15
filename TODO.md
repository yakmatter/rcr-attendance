# rcr-attendance

## To do list

### Get tests passing again
Quick fixes with limited volunteer time has left a working app with broken tests. This should probably fall on adam --since he broke them.

### Allow unfound skaters to be added to DB and event
Sometimes skaters are not yet in the database.  They should still be able to sign in.

### Share code between home.events and home.programs.teams.events
There's some code here which could be shared using mixins

### Allow more write access for Admin
Things like:
- Edit an event after creation
- Change a skater's name
- Add a skater
- Move a skater from one team to another
- Import CSV ...see the rcr-attendance-data TODO