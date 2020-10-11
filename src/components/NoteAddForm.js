import React, { useCallback, useState, Fragment } from 'react';

import notePriorities from '../models/notePriorities';

import {
	Button,
	Checkbox,
	Flex,
	Form,
	FormRow,
	RadioButtonGroup,
	TextArea,
	TextInput
} from 'fds/components';

const initialValueByName = {
	summary: '',
	content: '',
	// TODO: remove this initial value when adding field validation and feedback;
	// with this initial value, it will always be valid.
	priority: notePriorities[0].value,
	createAnother: false
};

function NoteAddForm({ onCancel, onSubmit }) {
	// TODO: convert to local state, validate 'priority' field, set feedback if no option is chosen
	// and prevent the Form from being submitted.
	// TODO: also consider validating 'summary' and 'content' fields, they shouldn't be empty
	// (after trim()).
	const feedbackByName = {};

	const [valueByName, setValueByName] = useState(initialValueByName);

	const handleFormFieldChange = useCallback(({ name, value }) => {
		setValueByName(prevValueByName => ({ ...prevValueByName, [name]: value }));
	}, []);

	const handleSubmitButtonClick = useCallback(() => {
		setValueByName({ ...initialValueByName, createAnother: valueByName.createAnother });

		onSubmit(valueByName);
	}, [onSubmit, valueByName]);

	// TODO: remove when adding form validation
	const hasEmptyFormField =
		valueByName.summary.trim() === '' ||
		valueByName.content.trim() === '' ||
		valueByName.priority.length === 0;

	return (
		<Fragment>
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
						label="Add"
						type="primary"
						onClick={handleSubmitButtonClick}
					/>

					<Flex alignItems="center" flex="none">
						<Checkbox label="Create another" name="createAnother" />
					</Flex>
				</Flex>
			</Form>
		</Fragment>
	);
}

export default NoteAddForm;
