# FDS Notes

## Concept

Let's use FDS (and glamor) to create an application to manage personal notes/post-its/todos etc.

_(The dependencies for both have already been added to the package.json for your convenience.
You shouldn't have to install any other external dependencies.)_

## v1 

### Features

1. Create an `(FDS)Form` to add a `Note`.
1. Display an `(FDS)VirtualList` of `Notes`.
1. Create an `(FDS)Form` to edit a `Note`.
1. Create an `(FDS)Form` to filter the list of `Notes`.
1. Add an option to delete a `Note` that shows a confirmation popover with a cancel/confirm option.

### UX Considerations

1. Disable/enable functionality based on App state and user input:
	* Disable/enable form submission based on form input.
	* Disable/enable filter controls based on existence of notes in list.
1. Hide the filter form when it is not used; 'open' it on demand (using conditional render	ing).
1. Show the edit form in place of the note inside the list when editing a note.
1. Use appropriate connotation colors and icons for different states and UI that performs actions.
	* Eg. primary/secondary buttons
	* Eg. warning/info connotations

### Technical considerations

1. Create separate components for these parts:
	* App
	* AddNoteForm
	* EditNoteForm
	* Note
	* NotesList
	* FilterNotesForm
1. Add more components whenever you think its best to do so.
1. Use FDS for as much of the styling/layout as you can.
1. Otherwise use applyCss props of `(FDS)Flex` and `Block` to customize styling.
1. Try to avoid custom elements (always try to use FDS components).
1. Centralize the state for the list of notes in a Fonto style "manager":  
	(This is in preparation of future versions of this exercise that will use a simple NodeJS-based
	backend/service to persist the list of notes to a file on disk (like the dev-cms in a Fonto app 
	could do)).
	* Create a separate file called notesManager.js.
	* Create a separate model for a Note.
	* Store the list of notes in a public variable called notes (array of Note models).
	* Add methods on the manager to:
		* addNote
		* editNote
		* deleteNote

### Suggestions to start implementing

1. Make sure you understand all of the features and ux/technical considerations.
1. Start with your 'information architecture': describe the data model(s).
1. Think about the different actions/things a user can do.
	1. What things influence the data model?
	1. What things influence the UI (only)?
1. Think about the different visual components you need.
1. Think about the different visual/functional states of those components and for the 
system/app as a whole.
1. Think about which component/manager should own what data(models)/state.
1. Use the [FDS Playground](https://fds.playground.fontoxml.com) to explore what's 
available in FDS.