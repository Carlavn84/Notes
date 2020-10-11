import React, { useCallback, useState } from 'react';

import {
	App,
	Button,
	Card,
	Flex,
	FontoLogo,
	Heading,
	Masthead,
	MastheadContent
} from 'fds/components';

import FilterNotesForm from './components/FilterNotesForm';
import NoteAddForm from './components/NoteAddForm';
import NotesList from './components/NotesList';

import noteModelsManager from './models/noteModelsManager';

import useManagerState from './utils/useManagerState';

const centerContainerStyles = { width: '700px' };

function NotesApp() {
	// list
	const noteModels = useManagerState(
		noteModelsManager.noteModelsChangedNotifier,
		noteModelsManager.getFilteredNoteModels
	);
	// list/filter
	const [filterNotesFormIsVisible, setFilterNotesFormIsVisible] = useState(false);
	const handleFilterButtonClick = useCallback(
		() => setFilterNotesFormIsVisible(filterNotesFormIsVisible => !filterNotesFormIsVisible),
		[]
	);
	const handleFilterNoteFormCancel = useCallback(() => setFilterNotesFormIsVisible(false), []);
	const handleFilterNoteFormSubmit = useCallback(valueByName => {
		noteModelsManager.setFilterNotesFormValueByName(valueByName);

		setFilterNotesFormIsVisible(false);
	}, []);

	// add
	const [addNoteFormIsVisible, setAddNoteFormIsVisible] = useState(false);
	const handleAddButtonClick = useCallback(() => setAddNoteFormIsVisible(true), []);

	const handleNoteAddFormCancel = useCallback(() => setAddNoteFormIsVisible(false), []);
	const handleNoteAddFormSubmit = useCallback(valueByName => {
		noteModelsManager.add(valueByName);

		if (!valueByName.createAnother) {
			setAddNoteFormIsVisible(false);
		}
	}, []);

	// edit
	const noteModelIdInEditMode = useManagerState(
		noteModelsManager.noteModelIdInEditModeChangedNotifier,
		noteModelsManager.getNoteModelIdInEditMode
	);
	const handleNoteSetInEditMode = useCallback(
		noteModelToSetInEditMode =>
			noteModelsManager.setNoteModelIdInEditMode(noteModelToSetInEditMode.id),
		[]
	);
	const handleNoteEditFormCancel = useCallback(
		() => noteModelsManager.clearNoteModelIdInEditMode(),
		[]
	);
	const handleNoteEditFormSubmit = useCallback((noteModelToEdit, valueByName) => {
		noteModelsManager.edit(noteModelToEdit.id, valueByName);

		noteModelsManager.clearNoteModelIdInEditMode();
	}, []);

	// remove
	const handleNoteRemove = useCallback(
		noteModelToDelete => noteModelsManager.remove(noteModelToDelete.id),
		[]
	);

	return (
		<App>
			<Masthead>
				<MastheadContent>
					<FontoLogo />

					<Heading level="4" colorName="text-inverse-color">
						Notes ({noteModels.length})
					</Heading>
				</MastheadContent>
			</Masthead>

			<Flex alignItems="center" flex="1" flexDirection="column">
				<Flex
					applyCss={centerContainerStyles}
					flex="1"
					flexDirection="column"
					paddingSize={{ vertical: 'l' }}
					spaceSize="l"
				>
					<Flex flex="none" justifyContent="flex-end" spaceSize="l">
						<Button
							icon="filter"
							isDisabled={!!noteModelIdInEditMode}
							label="Filter"
							onClick={handleFilterButtonClick}
						/>

						<Button
							icon="plus"
							isDisabled={addNoteFormIsVisible || !!noteModelIdInEditMode}
							label="Add"
							onClick={handleAddButtonClick}
						/>
					</Flex>

					{filterNotesFormIsVisible && (
						<Card>
							<FilterNotesForm
								initialValueByName={noteModelsManager.getFilterNotesFormValueByName()}
								onCancel={handleFilterNoteFormCancel}
								onSubmit={handleFilterNoteFormSubmit}
							/>
						</Card>
					)}

					{addNoteFormIsVisible && (
						<Card>
							<NoteAddForm
								onCancel={handleNoteAddFormCancel}
								onSubmit={handleNoteAddFormSubmit}
							/>
						</Card>
					)}

					<NotesList
						isDisabled={
							addNoteFormIsVisible ||
							!!noteModelIdInEditMode ||
							filterNotesFormIsVisible
						}
						noteModelIdInEditMode={noteModelIdInEditMode}
						noteModels={noteModels}
						onNoteSetInEditMode={handleNoteSetInEditMode}
						onNoteEditFormCancel={handleNoteEditFormCancel}
						onNoteEditFormSubmit={handleNoteEditFormSubmit}
						onNoteRemove={handleNoteRemove}
					/>
				</Flex>
			</Flex>
		</App>
	);
}

export default NotesApp;
