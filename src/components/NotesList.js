import React, { useCallback } from 'react';

import { VirtualList } from 'fds/components';

import Note from './Note';

function NotesList({
	isDisabled,
	noteModelIdInEditMode,
	noteModels,
	onNoteSetInEditMode,
	onNoteEditFormCancel,
	onNoteEditFormSubmit,
	onNoteRemove
}) {
	const renderNote = useCallback(
		({ key, item: noteModel, onRef }) => (
			<Note
				key={key}
				inEditMode={noteModelIdInEditMode === noteModel.id}
				isDisabled={isDisabled}
				noteModel={noteModel}
				onSetInEditMode={onNoteSetInEditMode}
				onEditFormCancel={onNoteEditFormCancel}
				onEditFormSubmit={onNoteEditFormSubmit}
				onRef={onRef}
				onRemove={onNoteRemove}
			/>
		),
		[
			isDisabled,
			noteModelIdInEditMode,
			onNoteEditFormCancel,
			onNoteEditFormSubmit,
			onNoteRemove,
			onNoteSetInEditMode
		]
	);

	return (
		<VirtualList
			estimatedItemHeight={50}
			items={noteModels}
			paddingSize={0}
			renderItem={renderNote}
			spaceVerticalSize="m"
		/>
	);
}

export default NotesList;
