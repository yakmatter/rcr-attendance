# rcr-attendance

## To do list

### Get tests passing again
Quick fixes with limited volunteer time has left a working app with broken tests. This should probably fall on adam --since he broke them.

### Allow unfound skaters to be added to DB and event
Sometimes skaters are not yet in the database.  They should still be able to sign in.

### BUG: Allow event name to be edited
There is a default name created for the event ...the admin user is supposed to be able change the name, but this is not working right now.

### Refactor navigation in admin
- The **Teams** button is displayed as a tab in the sidebar ...that's weird
- Either add breadcrumbs or come up with a simpler presentation

### Allow more write access for Admin
Things like:
- Change a skater's name
- Add a skater
- Move a skater from one team to another
- Import CSV ...see the rcr-attendance-data TODO