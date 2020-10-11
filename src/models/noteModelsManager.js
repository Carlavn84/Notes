import Notifier from '../utils/Notifier';

import NoteModel from './NoteModel';
import notePriorities from './notePriorities';

const testNoteModels = [];
for (let i = 0; i < 15; ++i) {
	const randomIndex = Math.round(Math.random() * (notePriorities.length - 1));
	testNoteModels.push(
		new NoteModel('Test ' + i, 'Just testing', notePriorities[randomIndex].value)
	);
}

class NoteModelsManager {
	/**
	 * @type {NoteModel[]}
	 */
	_noteModels = testNoteModels;

	noteModelIdInEditModeChangedNotifier = new Notifier();
	noteModelsChangedNotifier = new Notifier();

	_noteModelIdInEditMode = null;
	_filterNotesFormValueByName = { priority: [] };

	setFilterNotesFormValueByName = valueByName => {
		this._filterNotesFormValueByName = valueByName;

		this.noteModelsChangedNotifier.executeCallbacks();
	};
	getFilterNotesFormValueByName = () => this._filterNotesFormValueByName;
	getFilteredNoteModels = () =>
		this._noteModels.filter(
			noteModel =>
				this._filterNotesFormValueByName.priority.length === 0 ||
				this._filterNotesFormValueByName.priority.includes(noteModel.priority)
		);

	add = valueByName => {
		this._noteModels = [
			new NoteModel(valueByName.summary, valueByName.content, valueByName.priority),
			...this._noteModels
		];

		this.noteModelsChangedNotifier.executeCallbacks();
	};

	setNoteModelIdInEditMode = noteModelId => {
		this._noteModelIdInEditMode = noteModelId;

		this.noteModelIdInEditModeChangedNotifier.executeCallbacks();
	};
	clearNoteModelIdInEditMode = () => {
		this._noteModelIdInEditMode = null;

		this.noteModelIdInEditModeChangedNotifier.executeCallbacks();
	};
	getNoteModelIdInEditMode = () => this._noteModelIdInEditMode;
	edit = (noteModelId, { summary, content, priority }) => {
		const index = this._noteModels.findIndex(noteModel => noteModel.id === noteModelId);
		const editedNoteModel = {
			...this._noteModels[index],
			summary,
			content,
			priority,
			updatedAt: Date.now()
		};

		this._noteModels = [
			...this._noteModels.slice(0, index),
			editedNoteModel,
			...this._noteModels.slice(index + 1)
		];

		this.noteModelsChangedNotifier.executeCallbacks();
	};

	remove = noteModelId => {
		const index = this._noteModels.findIndex(noteModel => noteModel.id === noteModelId);
		this._noteModels = [
			...this._noteModels.slice(0, index),
			...this._noteModels.slice(index + 1)
		];

		this.noteModelsChangedNotifier.executeCallbacks();
	};
}

export default new NoteModelsManager();
