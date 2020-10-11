import React, { useCallback, useState } from 'react';

import { Button, CheckboxGroup, Flex, Form, FormRow } from 'fds/components';

import notePriorities from '../models/notePriorities';

// No need to add validation to this form ever, any input here is a valid filter input/setting.
const feedbackByName = {};

function FilterNotesForm({ initialValueByName, onCancel, onSubmit }) {
	const [valueByName, setValueByName] = useState(initialValueByName);

	const handleFormFieldChange = useCallback(({ name, value }) => {
		setValueByName(prevValueByName => ({ ...prevValueByName, [name]: value }));
	}, []);

	const handleSubmitButtonClick = useCallback(() => onSubmit(valueByName), [
		onSubmit,
		valueByName
	]);

	return (
		<Form
			feedbackByName={feedbackByName}
			labelPosition="before"
			onFieldChange={handleFormFieldChange}
			valueByName={valueByName}
		>
			<FormRow label="Priority" labelColorName="text-color">
				<CheckboxGroup items={notePriorities} name="priority" />
			</FormRow>

			<Flex justifyContent="flex-end" spaceSize="l">
				<Button label="Cancel" onClick={onCancel} />

				<Button label="Set filters" type="primary" onClick={handleSubmitButtonClick} />
			</Flex>
		</Form>
	);
}

export default FilterNotesForm;
