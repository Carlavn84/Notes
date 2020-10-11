import React, { useCallback } from 'react';

import { CompactButton, Menu, MenuItem, Popover, PopoverAnchor, PopoverBody } from 'fds/components';

function NoteActionsPopoverAnchorButton({ noteModel, isDisabled, onRemove, onSetInEditMode }) {
	const renderAnchor = useCallback(
		({ isPopoverOpened, onRef, togglePopover }) => (
			<CompactButton
				icon="ellipsis-h"
				isDisabled={isDisabled}
				isSelected={isPopoverOpened}
				onClick={togglePopover}
				onRef={onRef}
			/>
		),
		[isDisabled]
	);
	const renderPopover = useCallback(
		({ togglePopover }) => (
			<Popover maxWidth="250px">
				<PopoverBody paddingSize={0}>
					<Menu>
						<MenuItem
							icon="pencil"
							label="Edit"
							onClick={() => {
								onSetInEditMode(noteModel);
								togglePopover();
							}}
						/>
						<MenuItem
							icon="times"
							label="Remove"
							onClick={() => {
								onRemove(noteModel);
								togglePopover();
							}}
						/>
					</Menu>
				</PopoverBody>
			</Popover>
		),
		[noteModel, onRemove, onSetInEditMode]
	);

	return <PopoverAnchor renderAnchor={renderAnchor} renderPopover={renderPopover} />;
}

export default NoteActionsPopoverAnchorButton;
