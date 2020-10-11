import generateUUID from '../utils/generateUUID.js';

import { STATUS_CREATED } from './STATUS.js';
import notePriorities from './notePriorities.js';

class NoteModel {
	id = generateUUID();

	summary = '';
	content = '';
	priority = null;

	createdAt = Date.now();
	updatedAt = Date.now();

	status = STATUS_CREATED;

	constructor(summary, content, priority = notePriorities[0].value) {
		this.summary = summary;
		this.content = content;
		this.priority = priority;
	}
}

export default NoteModel;
