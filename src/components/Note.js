import React, { Fragment } from 'react';

import { Card, Flex, Heading, Label, Text } from 'fds/components';

import NoteActionsPopoverAnchorButton from './NoteActionsPopoverAnchorButton';
import NoteEditForm from './NoteEditForm';

function Note({
	noteModel,
	inEditMode,
	isDisabled,
	onEditFormCancel,
	onEditFormSubmit,
	onSetInEditMode,
	onRef,
	onRemove
}) {
	return (
		<Card onRef={onRef}>
			{!inEditMode && (
				<Fragment>
					<Flex justifyContent="space-between">
						<Heading level="4" isBold>
							{noteModel.summary}
						</Heading>

						<Label>{noteModel.priority}</Label>

						<NoteActionsPopoverAnchorButton
							noteModel={noteModel}
							isDisabled={isDisabled}
							onRemove={onRemove}
							onSetInEditMode={onSetInEditMode}
						/>
					</Flex>

					<Text>{noteModel.content}</Text>
				</Fragment>
			)}

			{inEditMode && (
				<NoteEditForm
					noteModel={noteModel}
					onCancel={onEditFormCancel}
					onSubmit={onEditFormSubmit}
				/>
			)}
		</Card>
	);
}

export default Note;
