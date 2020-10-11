import React, { useCallback, useState } from 'react';

import notePriorities from '../models/notePriorities';

import { Button, Flex, Form, FormRow, RadioButtonGroup, TextInput, TextArea } from 'fds/components';

function NoteEditForm({ noteModel, onCancel, onSubmit }) {
	// TODO: consider converting to local state, validate 'summary' and 'content' fields, they shouldn't be empty
	// (after trim()).
	// priority can never become invalid in this edit form, no need to validate field that here.
	const feedbackByName = {};

	const [valueByName, setValueByName] = useState({
		summary: noteModel.summary,
		content: noteModel.content,
		priority: noteModel.priority
	});

	const handleFormFieldChange = useCallback(({ name, value }) => {
		setValueByName(prevValueByName => ({ ...prevValueByName, [name]: value }));
	}, []);

	const handleSubmitButtonClick = useCallback(() => onSubmit(noteModel, valueByName), [
		noteModel,
		onSubmit,
		valueByName
	]);

	// TODO: remove when adding form validation
	const hasEmptyFormField =
		valueByName.summary.trim() === '' || valueByName.content.trim() === '';

	return (
		<Form
			feedbackByName={feedbackByName}
			labelPosition="before"
			onFieldChange={handleFormFieldChange}
			valueByName={valueByName}
		>
			<FormRow hasRequiredAsterisk label="Summary">
				<TextInput name="summary" />
			</FormRow>

			<FormRow hasRequiredAsterisk label="Content">
				<TextArea name="content" />
			</FormRow>

			<FormRow hasRequiredAsterisk label="Priority" labelColorName="text-color">
				<RadioButtonGroup items={notePriorities} name="priority" />
			</FormRow>

			<Flex justifyContent="flex-end" spaceSize="l">
				<Button label="Cancel" onClick={onCancel} />

				<Button
					// TODO: convert to: hasFormFeedback() when adding form validation
					isDisabled={hasEmptyFormField}
					label="Edit"
					onClick={handleSubmitButtonClick}
					type="primary"
				/>
			</Flex>
		</Form>
	);
}

export default NoteEditForm;
